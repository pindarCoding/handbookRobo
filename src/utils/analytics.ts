/**
 * Google Analytics 4 Tracking Utilities
 * 
 * Provides type-safe wrappers for GA4 event tracking using gtag.js
 */

// Type definitions for custom events
export type ContentType = 'theme' | 'subtheme' | 'custom';

export interface PdfDownloadParams {
  content_type: ContentType;
  taxonomic_code: string;
  pdf_language: string;
  file_name?: string;
}

/**
 * Send a PDF download event to GA4
 * 
 * Event name: pdf_download
 */
export const trackPdfDownload = (params: PdfDownloadParams): void => {
  // Check if GA4 is initialized
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Analytics] GA4 not initialized - event not sent:', params);
    return;
  }

  try {
    window.gtag('event', 'pdf_download', {
      ...params,
      timestamp: new Date().toISOString(),
    });

    console.log('[Analytics] PDF download tracked:', params);
  } catch (error) {
    console.error('[Analytics] Error tracking PDF download:', error);
  }
};

/**
 * Track custom handbook export
 * 
 * Event name: handbook_export
 */
export const trackHandbookExport = (params: {
  page_count: number;
  pdf_language: string;
  taxonomic_codes: string[];
}): void => {
  if (typeof window === 'undefined' || !window.gtag) {
    console.warn('[Analytics] GA4 not initialized - event not sent:', params);
    return;
  }

  try {
    window.gtag('event', 'handbook_export', {
      ...params,
      taxonomic_codes_string: params.taxonomic_codes.join(','),
      timestamp: new Date().toISOString(),
    });

    console.log('[Analytics] Handbook export tracked:', params);
  } catch (error) {
    console.error('[Analytics] Error tracking handbook export:', error);
  }
};
