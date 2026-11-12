/**
 * Islamic-themed color palette for المحمد app
 * Supports Light and Dark themes with Islamic green and gold accents.
 */

export const lightTheme = {
  // Primary: Islamic Green
  primary: '#1B5E20',
  primaryLight: '#2E7D32',
  primaryDark: '#0D3B13',
  primaryFaded: 'rgba(27, 94, 32, 0.12)',

  // Secondary: Gold
  secondary: '#D4AF37',
  secondaryLight: '#E0C068',
  secondaryDark: '#B8960F',
  secondaryFaded: 'rgba(212, 175, 55, 0.15)',

  // Accent
  accent: '#00796B',
  accentLight: '#009688',

  // Backgrounds
  background: '#F5F5F0',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardElevated: '#FAFAF5',
  modalBackground: 'rgba(0, 0, 0, 0.5)',

  // Text
  textPrimary: '#1C1C1C',
  textSecondary: '#5A5A5A',
  textTertiary: '#8A8A8A',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#1C1C1C',
  textArabic: '#2C2C2C',
  textQuran: '#1B5E20',

  // Borders & Dividers
  border: '#E0E0D8',
  borderLight: '#EEEEEA',
  divider: '#E8E8E0',

  // Status
  success: '#2E7D32',
  warning: '#F9A825',
  error: '#C62828',
  info: '#1565C0',

  // Misc
  shadow: 'rgba(0, 0, 0, 0.1)',
  ripple: 'rgba(27, 94, 32, 0.15)',
  skeleton: '#E0E0D8',
  tabBarBackground: '#FFFFFF',
  tabBarActive: '#1B5E20',
  tabBarInactive: '#8A8A8A',
  headerBackground: '#1B5E20',
  headerText: '#FFFFFF',
  statusBar: 'dark' as const,
  isDark: false,
};

export const darkTheme: Theme = {
  // Primary: Islamic Green (brighter for dark mode)
  primary: '#4CAF50',
  primaryLight: '#66BB6A',
  primaryDark: '#388E3C',
  primaryFaded: 'rgba(76, 175, 80, 0.15)',

  // Secondary: Gold (brighter for dark mode)
  secondary: '#FFD54F',
  secondaryLight: '#FFE082',
  secondaryDark: '#D4AF37',
  secondaryFaded: 'rgba(255, 213, 79, 0.15)',

  // Accent
  accent: '#4DB6AC',
  accentLight: '#80CBC4',

  // Backgrounds
  background: '#121212',
  surface: '#1E1E1E',
  card: '#252525',
  cardElevated: '#2C2C2C',
  modalBackground: 'rgba(0, 0, 0, 0.7)',

  // Text
  textPrimary: '#EAEAEA',
  textSecondary: '#B0B0B0',
  textTertiary: '#787878',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#1C1C1C',
  textArabic: '#F0F0F0',
  textQuran: '#81C784',

  // Borders & Dividers
  border: '#383838',
  borderLight: '#2E2E2E',
  divider: '#333333',

  // Status
  success: '#66BB6A',
  warning: '#FFB74D',
  error: '#EF5350',
  info: '#42A5F5',

  // Misc
  shadow: 'rgba(0, 0, 0, 0.4)',
  ripple: 'rgba(76, 175, 80, 0.2)',
  skeleton: '#333333',
  tabBarBackground: '#1E1E1E',
  tabBarActive: '#4CAF50',
  tabBarInactive: '#787878',
  headerBackground: '#1E1E1E',
  headerText: '#EAEAEA',
  statusBar: 'light' as const,
  isDark: true,
};

export type Theme = typeof lightTheme;

/** Font sizes for Arabic typography */
export const arabicFontSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 26,
  xl: 32,
  xxl: 40,
  quranAyah: 28,
  quranSurahTitle: 24,
  adhkar: 22,
} as const;

/** Spacing scale */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/** Border radius scale */
export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
