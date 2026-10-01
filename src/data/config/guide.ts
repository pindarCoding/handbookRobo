import type { Language } from "@/components/providers/language-provider";

// Suffissi usati nei nomi file per lingua
const PDF_SUFFIX: Record<Language, string> = {
  en: "EN",
  it: "IT",
  de: "DE",
  pl: "PL",
  pt: "PT",
};

const VIDEO_SUFFIX: Record<Language, string> = {
  en: "ENG",
  it: "ITA",
  de: "DE",
  pl: "PL",
  pt: "PT",
};

// Nome file della guida "Getting started" in public/pdfs/<lang>/
export const getGuidePdf = (language: Language) =>
  `MyCo-Getting-started-with-Handbook_${PDF_SUFFIX[language] ?? "EN"}.pdf`;

// Percorso del video tutorial in public/
export const getTutorialVideo = (language: Language) =>
  `/MyCo_Tutorial_${VIDEO_SUFFIX[language] ?? "ENG"}.mp4`;
