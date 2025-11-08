/**
 * TAXONOMY MAPPINGS - Centralized CODE ↔ ID conversions
 * 
 * FILOSOFIA:
 * - CODE (T5, T5.1, GZ): Immutabili, gerarchici, usati per file naming e navigation
 * - ID (work, work-values, genz): Human-readable slugs, possono cambiare
 * 
 * Questo file è l'unica fonte di verità per i mapping.
 * Qualsiasi modifica ai nomi (ID) va fatta solo qui.
 */

// ============================================
// THEME MAPPINGS
// ============================================

/**
 * Mapping CODE → ID per i themes
 * Usato per: caricare il JSON corretto (T5 → t5_cards.json)
 */
export const THEME_CODE_TO_ID: Record<string, string> = {
  'T1': 'communication',
  'T2': 'diversity',
  'T3': 'digital',
  'T4': 'intercultural',
  'T5': 'work'
} as const;

/**
 * Mapping inverso ID → CODE per i themes
 * Usato per: conversioni da ID legacy a CODE
 */
export const THEME_ID_TO_CODE: Record<string, string> = {
  'communication': 'T1',
  'diversity': 'T2',
  'digital': 'T3',
  'intercultural': 'T4',
  'work': 'T5'
} as const;

/**
 * Helper: Ottieni theme ID da CODE
 * @param themeCode - Theme CODE (es: 'T5')
 * @returns Theme ID (es: 'work') o undefined
 * @example getThemeId('T5') → 'work'
 */
export function getThemeId(themeCode: string): string | undefined {
  return THEME_CODE_TO_ID[themeCode];
}

/**
 * Helper: Ottieni theme CODE da ID
 * @param themeId - Theme ID (es: 'work')
 * @returns Theme CODE (es: 'T5') o undefined
 * @example getThemeCode('work') → 'T5'
 */
export function getThemeCode(themeId: string): string | undefined {
  return THEME_ID_TO_CODE[themeId];
}

// ============================================
// GENERATION MAPPINGS
// ============================================

/**
 * Mapping CODE → ID per le generazioni
 */
export const GENERATION_CODE_TO_ID: Record<string, string> = {
  'GZ': 'genz',
  'GM': 'millennial',
  'GX': 'genx',
  'GB': 'boomer'
} as const;

/**
 * Mapping inverso ID → CODE per le generazioni
 */
export const GENERATION_ID_TO_CODE: Record<string, string> = {
  'genz': 'GZ',
  'millennial': 'GM',
  'genx': 'GX',
  'boomer': 'GB'
} as const;

/**
 * Helper: Ottieni generation ID da CODE
 * @param genCode - Generation CODE (es: 'GZ')
 * @returns Generation ID (es: 'genz') o undefined
 * @example getGenerationId('GZ') → 'genz'
 */
export function getGenerationId(genCode: string): string | undefined {
  return GENERATION_CODE_TO_ID[genCode];
}

/**
 * Helper: Ottieni generation CODE da ID
 * @param genId - Generation ID (es: 'genz')
 * @returns Generation CODE (es: 'GZ') o undefined
 * @example getGenerationCode('genz') → 'GZ'
 */
export function getGenerationCode(genId: string): string | undefined {
  return GENERATION_ID_TO_CODE[genId];
}

// ============================================
// CODE PARSING UTILITIES
// ============================================

/**
 * Estrai theme CODE da subtheme CODE
 * @param subThemeCode - SubTheme CODE (es: 'T5.1')
 * @returns Theme CODE (es: 'T5')
 * @example parseThemeCode('T5.1') → 'T5'
 */
export function parseThemeCode(subThemeCode: string): string {
  return subThemeCode.split('.')[0];
}

/**
 * Estrai subtheme CODE completo da card CODE
 * @param cardCode - Card CODE (es: 'T5.1.GZ')
 * @returns SubTheme CODE (es: 'T5.1')
 * @example parseSubThemeCode('T5.1.GZ') → 'T5.1'
 */
export function parseSubThemeCode(cardCode: string): string {
  const parts = cardCode.split('.');
  return `${parts[0]}.${parts[1]}`;
}

/**
 * Estrai generation CODE da card CODE
 * @param cardCode - Card CODE (es: 'T5.1.GZ')
 * @returns Generation CODE (es: 'GZ')
 * @example parseGenerationCode('T5.1.GZ') → 'GZ'
 */
export function parseGenerationCode(cardCode: string): string {
  const parts = cardCode.split('.');
  return parts[2] || '';
}

/**
 * Valida formato card CODE
 * @param code - Card CODE da validare
 * @returns true se il formato è valido (T5.1.GZ)
 * @example isValidCardCode('T5.1.GZ') → true
 * @example isValidCardCode('T5.GZ') → false
 */
export function isValidCardCode(code: string): boolean {
  const parts = code.split('.');
  
  // Deve avere esattamente 3 parti
  if (parts.length !== 3) return false;
  
  // Prima parte deve iniziare con 'T' e avere un numero
  if (!parts[0].match(/^T\d+$/)) return false;
  
  // Seconda parte deve essere un numero
  if (!parts[1].match(/^\d+$/)) return false;
  
  // Terza parte deve essere un generation code valido
  if (!['GZ', 'GM', 'GX', 'GB'].includes(parts[2])) return false;
  
  return true;
}

/**
 * Valida formato subtheme CODE
 * @param code - SubTheme CODE da validare
 * @returns true se il formato è valido (T5.1)
 * @example isValidSubThemeCode('T5.1') → true
 * @example isValidSubThemeCode('T5') → false
 */
export function isValidSubThemeCode(code: string): boolean {
  const parts = code.split('.');
  
  // Deve avere esattamente 2 parti
  if (parts.length !== 2) return false;
  
  // Prima parte deve iniziare con 'T' e avere un numero
  if (!parts[0].match(/^T\d+$/)) return false;
  
  // Seconda parte deve essere un numero
  if (!parts[1].match(/^\d+$/)) return false;
  
  return true;
}

/**
 * Valida formato theme CODE
 * @param code - Theme CODE da validare
 * @returns true se il formato è valido (T5)
 * @example isValidThemeCode('T5') → true
 * @example isValidThemeCode('T5.1') → false
 */
export function isValidThemeCode(code: string): boolean {
  return /^T\d+$/.test(code);
}