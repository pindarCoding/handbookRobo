// Google Analytics 4 (gtag.js) Type Definitions
// Extends the global Window interface to include gtag types

export {};

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
