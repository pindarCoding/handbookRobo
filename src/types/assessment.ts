// src/types/assessment.ts

/**
 * ASSESSMENT TYPES
 * SV0031 - Tipi per il sistema Test Assessment
 * 
 * Struttura:
 * - 30 domande totali (6 per tema × 5 temi)
 * - Test: 10 domande (2 random per tema)
 * - Formato: Multiple Choice (4 opzioni, 1 corretta)
 */

// ============================================
// QUESTION TYPES (from JSON)
// ============================================

/** Opzioni di risposta possibili */
export type AnswerOption = 'a' | 'b' | 'c' | 'd';

/** Mappa delle 4 opzioni di risposta */
export interface QuestionOptions {
  a: string;
  b: string;
  c: string;
  d: string;
}

/**
 * Singola domanda del test
 * Corrisponde alla struttura in questions.json
 */
export interface Question {
  /** Identificativo univoco: "T1.1.Q1" (Tema.Sottotema.NumDomanda) */
  code: string;
  /** Codice tema: "T1", "T2", etc. */
  themeCode: string;
  /** Codice sottotema: "T1.1", "T1.2", etc. */
  subThemeCode: string;
  /** Testo della domanda */
  question: string;
  /** Le 4 opzioni di risposta */
  options: QuestionOptions;
  /** Risposta corretta: 'a', 'b', 'c', o 'd' */
  correctAnswer: AnswerOption;
  /** Spiegazione mostrata nei risultati */
  explanation?: string;
}

/**
 * Schema del file JSON delle domande
 * Struttura di i18n/{lang}/questions.json
 */
export interface QuestionsFile {
  meta: {
    /** Versione del file per future migrazioni */
    version: string;
    /** Numero totale domande (30) */
    totalQuestions: number;
    /** Domande per tema (6) */
    questionsPerTheme: number;
  };
  questions: Question[];
}

// ============================================
// USER ANSWER TYPES
// ============================================

/**
 * Risposta dell'utente a una singola domanda
 */
export interface UserAnswer {
  /** Riferimento alla domanda */
  questionCode: string;
  /** Risposta data dall'utente ('a', 'b', 'c', 'd') */
  userAnswer: AnswerOption;
  /** Calcolato: userAnswer === question.correctAnswer */
  isCorrect: boolean;
}

// ============================================
// RESULT TYPES
// ============================================

/**
 * Risultato per singolo tema
 * Usato nel breakdown finale
 */
export interface ThemeResult {
  /** Codice tema: "T1", "T2", etc. */
  themeCode: string;
  /** Risposte corrette (0-2) */
  correct: number;
  /** Totale domande tema (sempre 2) */
  total: number;
}

/**
 * Risultato completo del test
 * Salvato in localStorage come ultimo risultato
 */
export interface TestResult {
  /** Timestamp completamento */
  completedAt: number;
  /** Risposte corrette totali (0-10) */
  score: number;
  /** Sempre 10 */
  totalQuestions: number;
  /** Percentuale 0-100 */
  percentage: number;
  /** Dettaglio risposte */
  answers: UserAnswer[];
  /** Breakdown per tema */
  themeBreakdown: ThemeResult[];
  /** Lingua del test (per coerenza con risultato) */
  language: string;
}

// ============================================
// TEST STATE TYPES
// ============================================

/** Stati possibili del test */
export type TestStatus = 'idle' | 'loading' | 'in-progress' | 'completed';

/**
 * Stato corrente del test in corso
 * Gestito da TestProvider
 */
export interface TestState {
  /** Stato corrente */
  status: TestStatus;
  /** Step attuale: 0-4 (5 step totali) */
  currentStep: number;
  /** 10 domande selezionate per questo test */
  questions: Question[];
  /** Risposte date finora */
  answers: UserAnswer[];
}

// ============================================
// UI CONFIGURATION TYPES
// ============================================

/**
 * Configurazione visuale per ogni step
 * Mappa step → tema → personaggio
 */
export interface StepConfig {
  /** Indice step: 0-4 */
  stepIndex: number;
  /** Tema associato */
  themeCode: string;
  /** Path immagine personaggio (placeholder → GIF) */
  characterImage: string;
}

// ============================================
// CONTEXT TYPES
// ============================================

/**
 * Tipo del contesto TestProvider
 * Espone state e actions
 */
export interface TestContextType {
  /** Stato test corrente */
  testState: TestState;
  /** Ultimo risultato salvato (null se mai completato) */
  lastResult: TestResult | null;
  
  // Actions
  /** Avvia nuovo test con domande random */
  startTest: () => Promise<void>;
  /** Registra risposta a una domanda */
  answerQuestion: (questionCode: string, answer: AnswerOption) => void;
  /** Vai allo step successivo */
  nextStep: () => void;
  /** Vai allo step precedente */
  previousStep: () => void;
  /** Completa test e calcola risultato */
  completeTest: () => void;
  /** Reset a stato idle */
  resetTest: () => void;
}
