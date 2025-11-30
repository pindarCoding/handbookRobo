// src/components/handbook/ExportOverlay.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ExportOverlayProps {
  isOpen: boolean;
  onComplete: () => void;
}

const EXPORT_STEPS = [
  { message: "Gathering your selected pages...", emoji: "📚" },
  { message: "Building your custom handbook...", emoji: "🔨" },
  { message: "Arranging the layout...", emoji: "📐" },
  { message: "Final touches...", emoji: "✨" },
  { message: "Your handbook is ready!", emoji: "🎉" },
];

const STEP_DURATION = 1500; // 1.5 secondi per step
const FINAL_STEP_DURATION = 800; // Ultimo step più veloce

export const ExportOverlay = ({ isOpen, onComplete }: ExportOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // [SV0030] Refs per evitare chiamate multiple e tracciare i timer
  const hasCompletedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // [SV0030] Reset quando si chiude
    if (!isOpen) {
      setCurrentStep(0);
      hasCompletedRef.current = false;
      return;
    }

    const totalSteps = EXPORT_STEPS.length;

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = prev + 1;

        // Se siamo all'ultimo step, fermiamo e chiamiamo onComplete
        if (nextStep >= totalSteps) {
          clearInterval(timer);
          
          // [SV0030] Guard: chiama onComplete solo se non è già stato chiamato
          if (!hasCompletedRef.current) {
            hasCompletedRef.current = true;
            
            // [SV0030] Traccia il timeout per poterlo pulire
            timeoutRef.current = setTimeout(() => {
              onComplete();
            }, FINAL_STEP_DURATION);
          }
          
          return prev;
        }

        return nextStep;
      });
    }, STEP_DURATION);

    // [SV0030] Cleanup: pulisci sia interval che timeout
    return () => {
      clearInterval(timer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // [SV0030] Rimosso onComplete dalle dipendenze - usiamo ref per la stabilità

// [SV0030] Ref stabile per onComplete (evita stale closure)
const onCompleteRef = useRef(onComplete);
useEffect(() => {
  onCompleteRef.current = onComplete;
}, [onComplete]);

useEffect(() => {
  // [SV0030] Reset quando si chiude
  if (!isOpen) {
    setCurrentStep(0);
    hasCompletedRef.current = false;
    return;
  }

  const totalSteps = EXPORT_STEPS.length;

  const timer = setInterval(() => {
    setCurrentStep((prev) => {
      const nextStep = prev + 1;

      if (nextStep >= totalSteps) {
        clearInterval(timer);
        
        // [SV0030] Guard: chiama onComplete solo se non è già stato chiamato
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          
          timeoutRef.current = setTimeout(() => {
            onCompleteRef.current(); // [SV0030] Usa il ref!
          }, FINAL_STEP_DURATION);
        }
        
        return prev;
      }

      return nextStep;
    });
  }, STEP_DURATION);

  return () => {
    clearInterval(timer);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
}, [isOpen]); // [SV0030] Solo isOpen come dipendenza

  const currentStepData = EXPORT_STEPS[currentStep];
  const progress = ((currentStep + 1) / EXPORT_STEPS.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal - PIÙ GRANDE */}
          <motion.div
            className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl 
                       w-full max-w-md md:max-w-3xl lg:max-w-4xl mx-auto overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col items-center">
              {/* GIF Container */}
              <div
                className="w-48 h-48 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] mb-8 rounded-2xl 
                            flex items-center justify-center overflow-hidden"
              >
                <Image
                  src="/characters/workTogheter.gif"
                  alt="Creating your handbook..."
                  width={450}
                  height={450}
                  className="w-full h-full object-contain"
                  unoptimized
                  priority
                />
              </div>

              {/* Emoji + Message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center mb-8"
                >
                  <span className="text-4xl mb-3 block">
                    {currentStepData.emoji}
                  </span>
                  <p className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200">
                    {currentStepData.message}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {/* Step Counter */}
              <p className="mt-4 text-base text-slate-500 dark:text-slate-400">
                Step {currentStep + 1} of {EXPORT_STEPS.length}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};