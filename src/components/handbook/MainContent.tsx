// src/components/handbook/MainContent.tsx
'use client'

import { Theme, SubTheme, Generation, Card } from '@/data/handbook-data'
import { useBook } from '@/components/providers/book-provider'
import { PlusCircleIcon } from 'lucide-react'
import { YourBook } from './YourBook'
import { WelcomeContent } from './WelcomeContent'
import Image from 'next/image'

type FilterStep = 'theme' | 'subtheme' | 'generation'

interface MainContentProps {
  step: FilterStep
  selectedTheme: Theme | null
  selectedSubTheme: SubTheme | null
  selectedGeneration: Generation | null
  selectedCard: Card | null  // Cambiato da selectedVariant
}

export const MainContent = ({
  step,
  selectedTheme,
  selectedSubTheme,
  selectedGeneration,
  selectedCard  // Cambiato da selectedVariant
}: MainContentProps) => {
  const { addPage } = useBook()

  // Funzione per generare l'ID della pagina corrente
  const generatePageId = () => {
    if (selectedCard && selectedTheme && selectedSubTheme && selectedGeneration) {
      return `${selectedTheme.id}-${selectedSubTheme.id}-${selectedGeneration.id}-${selectedCard.id}`;
    }
    if (selectedTheme && selectedSubTheme) {
      return `${selectedTheme.id}-${selectedSubTheme.id}`;
    }
    if (selectedTheme) {
      return selectedTheme.id;
    }
    return '';
  }

  // Funzione per aggiungere la pagina corrente
  const handleAddPage = () => {
    if (selectedCard && selectedTheme && selectedSubTheme && selectedGeneration) {
      addPage({
        id: generatePageId(),
        title: selectedCard.title,
        themeId: selectedTheme.id,
        subThemeId: selectedSubTheme.id,
        generationId: selectedGeneration.id,
        cardId: selectedCard.id  // Cambiato da variantId
      });
    } else if (selectedTheme && selectedSubTheme) {
      addPage({
        id: generatePageId(),
        title: `${selectedSubTheme.title} (${selectedTheme.title})`,
        themeId: selectedTheme.id,
        subThemeId: selectedSubTheme.id
      });
    } else if (selectedTheme) {
      addPage({
        id: generatePageId(),
        title: selectedTheme.title,
        themeId: selectedTheme.id
      });
    }
  }

  // Funzione helper per determinare il colore della card
  const getCardColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'green':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'purple':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'cyan':
        return 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800';
      case 'pink':
        return 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800';
      case 'teal':
        return 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800';
      case 'indigo':
        return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800';
      default:
        return 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800';
    }
  }

  // Contenuto del main in base allo stato
  const renderContent = () => {
    // Stato iniziale - nessuna selezione
    if (!selectedTheme) {
      return <WelcomeContent />;
    }

 // Visualizzazione tema
if (step === 'theme' || (step === 'subtheme' && selectedTheme && !selectedSubTheme)) {
  return (
    <div className="animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {selectedTheme.title}
          </h2>
          <button
            type="button"
            onClick={handleAddPage}
            className="text-blue-500 hover:text-blue-700"
            title="Add to your handbook"
          >
            <PlusCircleIcon size={24} />
          </button>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-6">
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
            {selectedTheme.introduction}
          </p>
        </div>

        {selectedTheme.reportPdfUrl && (
          <div className="flex justify-center">
            <a
              href={selectedTheme.reportPdfUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Analysis Report
            </a>
          </div>
        )}
        
      </div>
    </div>
  );
}

    // Visualizzazione sottotema
    if (step === 'subtheme' && selectedSubTheme) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {selectedSubTheme.title}
                </h2>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Part of: {selectedTheme.title}
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddPage}
                className="text-blue-500 hover:text-blue-700"
                title="Add to your handbook"
              >
                <PlusCircleIcon size={24} />
              </button>
            </div>

            <div className="h-64 bg-slate-100 dark:bg-slate-700 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">
                Subtheme visualization coming soon
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300">
                Select a generation to explore specific approaches and methodologies.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Visualizzazione CARD quando si seleziona la generazione
    if (selectedCard && selectedGeneration && selectedSubTheme && selectedTheme) {
       // Verifica coerenza del themeId
  if (selectedCard.themeId !== selectedTheme.id) {
    console.error('Card theme mismatch!', {
      cardThemeId: selectedCard.themeId,
      selectedThemeId: selectedTheme.id
    });
    return null;
  }
      return (
        <div className="animate-fadeIn">
          {/* Card principale con stile distintivo */}
          <div className={`
            rounded-lg border-2 shadow-lg overflow-hidden
            ${getCardColorClasses(selectedCard.color)}
          `}>
            {/* Header della card */}
            <div className="bg-white dark:bg-slate-800 p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {selectedCard.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-sm font-medium text-blue-800 dark:text-blue-100">
                      {selectedGeneration.title} • {selectedGeneration.ageRange}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Page {selectedCard.page_id}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedCard.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddPage}
                  className="ml-4 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-md hover:shadow-lg"
                  title="Add to your handbook"
                >
                  <PlusCircleIcon size={28} />
                </button>
              </div>
            </div>

            {/* Corpo della card */}
            <div className="p-6 bg-white/50 dark:bg-slate-800/50">
              {/* Placeholder per contenuto futuro */}

              <div className="mb-6 rounded-lg overflow-hidden shadow-md">

                <div className="bg-white dark:bg-slate-800 rounded-lg p-8 mb-6 text-center">

                  {/* <BookOpenIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Full content for this card will be loaded here

                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Content ID: {selectedCard.page_id}
                  </p> */}

                </div>
                {selectedCard.image && (
                  <div className="mb-6 rounded-lg overflow-hidden shadow-md inline-block relative w-full">
                    <Image
                      src={selectedCard.image}
                      alt={selectedCard.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>


              {/* Informazioni aggiuntive */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    📍 Navigation Path
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {selectedTheme.title} → {selectedSubTheme.title} → {selectedGeneration.title}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    👥 About {selectedGeneration.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {selectedGeneration.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Fallback se generation è selezionata ma non c'è card
    if (step === 'generation' && selectedGeneration && !selectedCard) {
      return (
        <div className="animate-fadeIn">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              No card available
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              No content card found for {selectedGeneration.title} in {selectedSubTheme?.title}.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  // Layout a due colonne
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Area contenuto principale (più larga) */}
      <div className="lg:col-span-2">
        {renderContent()}
      </div>

      {/* Area YourBook (fissa sulla destra) */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <YourBook />
      </div>
    </div>
  );
}