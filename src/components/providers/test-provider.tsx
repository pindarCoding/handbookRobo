'use client';

/**
 * SV0034 - Provider per gestione Test Assessment
 * 
 * Responsabilità:
 * - Stato del test (idle/loading/in-progress/completed)
 * - Selezione random domande
 * - Gestione risposte utente
 * - Navigazione tra step
 * - Persistenza ultimo risultato in localStorage
 */

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useCallback,
  ReactNode 
} from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import { useLanguage } from './language-provider';
import { 
  TestContextType, 
  TestState, 
  TestResult, 
  AnswerOption,
  UserAnswer,
  ThemeResult
} from '@/types/assessment';

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = 'handbook-test-result';
const THEME_CODES = ['T1', 'T2', 'T3', 'T4', 'T5'] as const;

// ============================================
// INITIAL STATE
// ============================================

const initialTestState: TestState = {
  status: 'idle',
  currentStep: 0,
  questions: [],
  answers: []
};

// ============================================
// CONTEXT
// ============================================

const TestContext = createContext<TestContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function TestProvider({ children }: { children: ReactNode }) {
  const { selectTestQuestions } = useQuestions();
  const { language } = useLanguage();
  
  // Stato del test in corso
  const [testState, setTestState] = useState<TestState>(initialTestState);
  
  // Ultimo risultato salvato
  const [lastResult, setLastResult] = useState<TestResult | null>(null);

  // ==========================================
  // LOAD LAST RESULT FROM LOCALSTORAGE
  // ==========================================
  
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as TestResult;
        setLastResult(parsed);
        console.log('[SV0034] 📂 Loaded last test result from localStorage');
      }
    } catch (error) {
      console.error('[SV0034] ❌ Failed to load test result:', error);
    }
  }, []);

  // ==========================================
  // SAVE RESULT TO LOCALSTORAGE
  // ==========================================
  
  const saveResult = useCallback((result: TestResult) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      setLastResult(result);
      console.log('[SV0034] 💾 Saved test result to localStorage');
    } catch (error) {
      console.error('[SV0034] ❌ Failed to save test result:', error);
    }
  }, []);

  // ==========================================
  // ACTIONS
  // ==========================================

  /**
   * Avvia un nuovo test
   * - Seleziona 10 domande random (2 per tema)
   * - Resetta lo stato
   */
  const startTest = useCallback(async () => {
    console.log('[SV0034] 🚀 Starting new test...');
    
    setTestState(prev => ({
      ...prev,
      status: 'loading'
    }));

    // Piccolo delay per mostrare loading (UX)
    await new Promise(resolve => setTimeout(resolve, 500));

    const questions = selectTestQuestions();
    
    if (questions.length === 0) {
      console.error('[SV0034] ❌ No questions available');
      setTestState(initialTestState);
      return;
    }

    setTestState({
      status: 'in-progress',
      currentStep: 0,
      questions,
      answers: []
    });

    console.log(`[SV0034] ✅ Test started with ${questions.length} questions`);
  }, [selectTestQuestions]);

  /**
   * Registra la risposta a una domanda
   */
  const answerQuestion = useCallback((questionCode: string, answer: AnswerOption) => {
    console.log(`[SV0034] 📝 Answer: ${questionCode} = ${answer}`);
    
    setTestState(prev => {
      // Trova la domanda per verificare correttezza
      const question = prev.questions.find(q => q.code === questionCode);
      if (!question) {
        console.warn(`[SV0034] ⚠️ Question ${questionCode} not found`);
        return prev;
      }

      const isCorrect = answer === question.correctAnswer;
      
      const newAnswer: UserAnswer = {
        questionCode,
        userAnswer: answer,
        isCorrect
      };

      // Rimuovi eventuale risposta precedente per questa domanda
      const filteredAnswers = prev.answers.filter(a => a.questionCode !== questionCode);
      
      return {
        ...prev,
        answers: [...filteredAnswers, newAnswer]
      };
    });
  }, []);

  /**
   * Vai allo step successivo
   */
  const nextStep = useCallback(() => {
    setTestState(prev => {
      const newStep = Math.min(prev.currentStep + 1, 9);
      console.log(`[SV0034] ➡️ Next step: ${prev.currentStep} → ${newStep}`);
      return {
        ...prev,
        currentStep: newStep
      };
    });
  }, []);

  /**
   * Vai allo step precedente
   */
  const previousStep = useCallback(() => {
    setTestState(prev => {
      const newStep = Math.max(prev.currentStep - 1, 0);
      console.log(`[SV0034] ⬅️ Previous step: ${prev.currentStep} → ${newStep}`);
      return {
        ...prev,
        currentStep: newStep
      };
    });
  }, []);

  /**
   * Completa il test e calcola il risultato
   */
  const completeTest = useCallback(() => {
    console.log('[SV0034] 🏁 Completing test...');
    
    const { questions, answers } = testState;

    // Calcola breakdown per tema
    const themeBreakdown: ThemeResult[] = THEME_CODES.map(themeCode => {
      const themeQuestions = questions.filter(q => q.themeCode === themeCode);
      const themeAnswers = answers.filter(a => 
        themeQuestions.some(q => q.code === a.questionCode)
      );
      const correct = themeAnswers.filter(a => a.isCorrect).length;
      
      return {
        themeCode,
        correct,
        total: themeQuestions.length
      };
    });

    // Calcola score totale
    const score = answers.filter(a => a.isCorrect).length;
    const totalQuestions = questions.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    const result: TestResult = {
      completedAt: Date.now(),
      score,
      totalQuestions,
      percentage,
      answers,
      themeBreakdown,
      language
    };

    console.log(`[SV0034] 📊 Result: ${score}/${totalQuestions} (${percentage}%)`);

    // Salva e aggiorna stato
    saveResult(result);
    
    setTestState(prev => ({
      ...prev,
      status: 'completed'
    }));
  }, [testState, language, saveResult]);

  /**
   * Reset del test a stato idle
   */
  const resetTest = useCallback(() => {
    console.log('[SV0034] 🔄 Resetting test...');
    setTestState(initialTestState);
  }, []);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const contextValue: TestContextType = {
    testState,
    lastResult,
    startTest,
    answerQuestion,
    nextStep,
    previousStep,
    completeTest,
    resetTest
  };

  return (
    <TestContext.Provider value={contextValue}>
      {children}
    </TestContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

/**
 * Hook per accedere al contesto Test
 * @throws Error se usato fuori da TestProvider
 */
export function useTest(): TestContextType {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}