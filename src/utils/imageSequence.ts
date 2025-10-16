/**
 * Utility functions for generating image sequences
 * @module utils/imageSequence
 */

interface GenerateSequenceOptions {
  basePath: string;
  prefix: string;
  startFrame: number;
  endFrame: number;
  digits?: number;
  extension?: string;
}

/**
 * Genera un array di percorsi immagine per una sequenza numerata
 * @example
 * generateImageSequence({
 *   basePath: '/characters/test',
 *   prefix: 'Timeline 1_',
 *   startFrame: 86484,
 *   endFrame: 86520,
 *   digits: 8,
 *   extension: 'png'
 * })
 * // Returns: ['/characters/test/Timeline 1_00086484.png', ..., '/characters/test/Timeline 1_00086520.png']
 */
export const generateImageSequence = ({
  basePath,
  prefix,
  startFrame,
  endFrame,
  digits = 8,
  extension = 'png'
}: GenerateSequenceOptions): string[] => {
  const images: string[] = [];
  
  for (let i = startFrame; i <= endFrame; i++) {
    const frameNumber = i.toString().padStart(digits, '0');
    const fileName = `${prefix}${frameNumber}.${extension}`;
    // Usa encodeURI per gestire spazi e caratteri speciali
    const fullPath = encodeURI(`${basePath}/${fileName}`);
    images.push(fullPath);
  }
  
  return images;
};

/**
 * Genera sequenze con pattern più complessi
 * @example
 * generateComplexSequence({
 *   basePath: '/characters/hero',
 *   pattern: 'frame_{{index}}_final',
 *   start: 1,
 *   end: 30,
 *   step: 1,
 *   zeroPad: 3
 * })
 */
export const generateComplexSequence = ({
  basePath,
  pattern,
  start,
  end,
  step = 1,
  zeroPad = 0,
  extension = 'png'
}: {
  basePath: string;
  pattern: string;
  start: number;
  end: number;
  step?: number;
  zeroPad?: number;
  extension?: string;
}): string[] => {
  const images: string[] = [];
  
  for (let i = start; i <= end; i += step) {
    const index = zeroPad > 0 ? i.toString().padStart(zeroPad, '0') : i.toString();
    const fileName = pattern.replace('{{index}}', index) + '.' + extension;
    const fullPath = `${basePath}/${fileName}`;
    images.push(fullPath);
  }
  
  return images;
};

/**
 * Utility per verificare quanti frame sono effettivamente disponibili
 * (utile per debug in development)
 */
export const validateImageSequence = async (images: string[]): Promise<{
  valid: string[];
  missing: string[];
}> => {
  if (typeof window === 'undefined') {
    return { valid: images, missing: [] };
  }

  const valid: string[] = [];
  const missing: string[] = [];

  await Promise.all(
    images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            valid.push(src);
            resolve();
          };
          img.onerror = () => {
            missing.push(src);
            resolve();
          };
          img.src = src;
        })
    )
  );

  return { valid, missing };
};

/**
 * Helper per creare sequenze comuni
 */
export const sequences = {
  /**
   * Sequenza numerica semplice (001.png, 002.png, ...)
   */
  numeric: (basePath: string, count: number, digits = 3) =>
    generateImageSequence({
      basePath,
      prefix: '',
      startFrame: 1,
      endFrame: count,
      digits,
      extension: 'png'
    }),

  /**
   * Sequenza con prefisso (frame_001.png, frame_002.png, ...)
   */
  withPrefix: (basePath: string, prefix: string, count: number, digits = 3) =>
    generateImageSequence({
      basePath,
      prefix: prefix,
      startFrame: 1,
      endFrame: count,
      digits,
      extension: 'png'
    }),

  /**
   * Sequenza custom range
   */
  range: (basePath: string, prefix: string, start: number, end: number, digits = 8) =>
    generateImageSequence({
      basePath,
      prefix,
      startFrame: start,
      endFrame: end,
      digits,
      extension: 'png'
    })
};