// src/hooks/useQuestions.ts

/**
 * SV0033 - Hook per gestione domande Assessment
 * 
 * Responsabilità:
 * - Carica questions.json per la lingua corrente
 * - Fornisce selezione random di 10 domande (2 per tema)
 * - Fallback a EN se lingua non disponibile
 */

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { Question, QuestionsFile } from '@/types/assessment';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Fisher-Yates shuffle - randomizza array in place
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Seleziona N domande random da un array
 */
function selectRandom<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

// ============================================
// CONSTANTS
// ============================================

const THEME_CODES = ['T1', 'T2', 'T3', 'T4', 'T5'] as const;
const QUESTIONS_PER_THEME = 2;

// ============================================
// HOOK
// ============================================

interface UseQuestionsReturn {
  /** Tutte le domande caricate */
  allQuestions: Question[];
  /** Stato di caricamento */
  isLoading: boolean;
  /** Eventuale errore */
  error: string | null;
  /** Seleziona 10 domande random (2 per tema) */
  selectTestQuestions: () => Question[];
  /** Metadata dal file JSON */
  meta: QuestionsFile['meta'] | null;
}

export function useQuestions(): UseQuestionsReturn {
  const { language } = useLanguage();
  
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [meta, setMeta] = useState<QuestionsFile['meta'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica le domande quando cambia la lingua
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError(null);
      
      console.log(`[SV0033] 📚 Loading questions for language: ${language}`);
      
      try {
        // Prova a caricare per la lingua corrente
        let questionsData: QuestionsFile;
        
        try {
          const data = await import(`@/data/i18n/${language}/questions.json`);
          questionsData = data as unknown as QuestionsFile;
          console.log(`[SV0033] ✅ Loaded ${language} questions`);
        } catch {
          // Fallback a inglese
          console.log(`[SV0033] ⚠️ No questions for ${language}, falling back to EN`);
          const data = await import('@/data/i18n/en/questions.json');
          questionsData = data as unknown as QuestionsFile;
        }
        
        setAllQuestions(questionsData.questions);
        setMeta(questionsData.meta);
        
        console.log(`[SV0033] 📊 Loaded ${questionsData.questions.length} questions`);
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
        console.error('[SV0033] ❌ Error loading questions:', errorMessage);
        setError(errorMessage);
        setAllQuestions([]);
        setMeta(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [language]);

  /**
   * Seleziona 10 domande random per il test
   * 2 domande per ogni tema (T1-T5)
   */
  const selectTestQuestions = useCallback((): Question[] => {
    if (allQuestions.length === 0) {
      console.warn('[SV0033] ⚠️ No questions available for selection');
      return [];
    }

    console.log('[SV0033] 🎲 Selecting random test questions...');
    
    const selectedQuestions: Question[] = [];

    for (const themeCode of THEME_CODES) {
      // Filtra domande per questo tema
      const themeQuestions = allQuestions.filter(q => q.themeCode === themeCode);
      
      if (themeQuestions.length < QUESTIONS_PER_THEME) {
        console.warn(`[SV0033] ⚠️ Theme ${themeCode} has only ${themeQuestions.length} questions`);
        // Prendi tutte quelle disponibili
        selectedQuestions.push(...themeQuestions);
      } else {
        // Seleziona 2 random
        const selected = selectRandom(themeQuestions, QUESTIONS_PER_THEME);
        selectedQuestions.push(...selected);
      }
    }

    console.log(`[SV0033] ✅ Selected ${selectedQuestions.length} questions:`, 
      selectedQuestions.map(q => q.code).join(', ')
    );

    return selectedQuestions;
  }, [allQuestions]);

  return {
    allQuestions,
    isLoading,
    error,
    selectTestQuestions,
    meta
  };
}