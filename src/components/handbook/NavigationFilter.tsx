// src/components/handbook/NavigationFilter.tsx
"use client";

import { Theme, SubTheme, Generation, generations } from "@/data/handbook-data";
import { GenerationCharacter } from "@/components/GenerationCharacter/GenerationCharacter";
import { ProgressIndicator } from "./ProgressIndicator";
import { getGenerationClasses } from "@/data/config/colors";

type FilterStep = "theme" | "subtheme" | "generation";

interface NavigationFilterProps {
  currentStep: FilterStep;
  selectedTheme: Theme | null;
  selectedSubTheme: SubTheme | null;
  selectedGeneration: Generation | null;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
  onSubThemeSelect: (subTheme: SubTheme) => void;
  onGenerationSelect: (generation: Generation) => void;
  onBack: () => void;
  context?: "desktop" | "mobile"; // ← NUOVO: default 'desktop'
}

export const NavigationFilter = ({
  currentStep,
  selectedTheme,
  selectedSubTheme,
  selectedGeneration,
  themes,
  onThemeSelect,
  onSubThemeSelect,
  onGenerationSelect,
  onBack,
  context = "desktop",
}: NavigationFilterProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Back Button - Solo Desktop */}
      {context === "desktop" && currentStep !== "theme" && (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 
               hover:text-slate-900 dark:hover:text-white 
               transition-colors text-sm font-medium"
            title="Go back"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </div>
      )}

      {/* Progress Indicator Compatto */}
      {context === "desktop" && (
        <ProgressIndicator currentStep={currentStep} variant="compact" />
      )}
      {/* Navigation Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* THEME Selection */}
        {currentStep === "theme" && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Select Theme
            </h3>
            {themes.map((theme,index) => (
              <button
                type="button"
                key={theme.id}
                onClick={() => onThemeSelect(theme)}
                className={`w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-700 
                   text-slate-700 dark:text-slate-200 text-sm
                   hover:bg-slate-200 dark:hover:bg-slate-600
                   transition-all text-left font-medium
                   border-l-4 ${index % 2 === 0 ? 'border-l-blue-500' : 'border-l-orange-500'}`}
      >
                {theme.title}
              </button>
            ))}
          </div>
        )}

        {/* SUBTHEME Selection */}
        {currentStep === "subtheme" && selectedTheme && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Select Subtheme
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 mb-3 p-2 bg-slate-100 dark:bg-slate-700/50 rounded">
              {selectedTheme.title}
            </div>
            {selectedTheme.subThemes.map((subTheme, index) => (
              <button
                type="button"
                key={subTheme.id}
                onClick={() => onSubThemeSelect(subTheme)}
                className={`w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-700 
                         text-slate-700 dark:text-slate-200 text-sm
                         hover:bg-blue-100 dark:hover:bg-blue-900/30
                         hover:text-blue-700 dark:hover:text-blue-300
                         transition-all text-left font-medium
                         border-l-4 ${index % 2 === 0 ? 'border-l-blue-500' : 'border-l-purple-500'}`}
              >
                {subTheme.title}
              </button>
            ))}
          </div>
        )}

        {/* GENERATION Selection */}
        {currentStep === "generation" && (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Select Generation
            </h3>
            {selectedTheme && selectedSubTheme && (
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-3 p-2 bg-slate-100 dark:bg-slate-700/50 rounded">
                {selectedTheme.title} → {selectedSubTheme.title}
              </div>
            )}

            {/* Container con layout dinamico: 1 colonna desktop, 2 colonne mobile */}
            <div
              className={
                context === "mobile" ? "grid grid-cols-2 gap-3" : "space-y-3"
              }
            >
              {generations.map((generation) => {
                const colors = getGenerationClasses(generation.id);
                const testBg =
                  generation.id === "genz" ? "bg-purple-500" : colors.bg;

                console.log("Generation:", generation.id, "Colors:", colors); // ← DEBUG

                return (
                  <button
                    type="button"
                    key={generation.id}
                    onClick={() => onGenerationSelect(generation)}
                    className={`
       w-full p-3 rounded-lg bg-slate-100 dark:bg-slate-700 
                         text-slate-700 dark:text-slate-200 text-sm
                         hover:bg-blue-100 dark:hover:bg-blue-900/30
                         hover:text-blue-700 dark:hover:text-blue-300
                         transition-all text-left font-medium
        border-l-4 ${colors.border}
        text-center
      `}
                  >
                    {/* Avatar centrato */}
                    {generation.characterFolder && (
                      <div className="flex justify-center mb-2">
                        <GenerationCharacter
                          characterFolder={generation.characterFolder}
                          frameStart={generation.frameStart || 1}
                          frameEnd={generation.frameEnd || 10}
                          framePrefix={generation.framePrefix}
                          size={context === "mobile" ? 50 : 100}
                          frameRate={24}
                          showBorder={true}
                          borderColor={
                            selectedGeneration?.id === generation.id
                              ? colors.border.replace("border-", "border-")
                              : colors.border.replace("border-", "border-")
                          }
                          className="transition-all group-hover:scale-110"
                        />
                      </div>
                    )}

                    {/* Testo centrato */}
                    <div>
                      <h3
                        className={`font-bold mb-1 transition-colors leading-tight
              ${context === "mobile" ? "text-xs" : "text-sm"}
              ${
                selectedGeneration?.id === generation.id
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400"
              }`}
                      >
                        {generation.title}
                      </h3>
                      <p
                        className={`text-slate-500 dark:text-slate-400 ${
                          context === "mobile" ? "text-xs" : "text-xs"
                        }`}
                      >
                        {generation.ageRange}
                      </p>
                    </div>

                    {/* Badge di selezione */}
                    {selectedGeneration?.id === generation.id && (
                      <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
