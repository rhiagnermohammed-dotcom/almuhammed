/**
 * Common reusable styles for المحمد app.
 * All styles are RTL-aware and designed for Arabic-first layout.
 */

import { StyleSheet, Platform, I18nManager } from 'react-native';
import { arabicFontSizes, spacing, borderRadius } from './theme';

// Ensure RTL is enabled
if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

/**
 * Common styles — theme-independent layout and structure.
 * For themed colors, use the `useAppTheme` hook from ThemeContext.
 */
export const commonStyles = StyleSheet.create({
  // ─── Containers ──────────────────────────────────────────
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  containerPadded: {
    flex: 1,
    padding: spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },

  // ─── Rows & Layout ──────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  // ─── Cards ───────────────────────────────────────────────
  card: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  cardLarge: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginVertical: spacing.sm,
  },
  cardCompact: {
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginVertical: spacing.xs,
  },

  // ─── Header ──────────────────────────────────────────────
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    writingDirection: 'rtl',
    textAlign: 'right',
    marginTop: spacing.xs,
  },

  // ─── Arabic Text ─────────────────────────────────────────
  arabicTextXL: {
    fontSize: arabicFontSizes.xxl,
    fontWeight: '700',
    writingDirection: 'rtl',
    textAlign: 'center',
    lineHeight: arabicFontSizes.xxl * 1.8,
  },
  arabicTextLarge: {
    fontSize: arabicFontSizes.xl,
    fontWeight: '600',
    writingDirection: 'rtl',
    textAlign: 'center',
    lineHeight: arabicFontSizes.xl * 1.7,
  },
  arabicTextMedium: {
    fontSize: arabicFontSizes.md,
    fontWeight: '500',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: arabicFontSizes.md * 1.8,
  },
  arabicTextSmall: {
    fontSize: arabicFontSizes.sm,
    fontWeight: '400',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: arabicFontSizes.sm * 1.7,
  },
  arabicTextXS: {
    fontSize: arabicFontSizes.xs,
    fontWeight: '400',
    writingDirection: 'rtl',
    textAlign: 'right',
    lineHeight: arabicFontSizes.xs * 1.6,
  },
  quranAyahText: {
    fontSize: arabicFontSizes.quranAyah,
    fontWeight: '400',
    writingDirection: 'rtl',
    textAlign: 'center',
    lineHeight: arabicFontSizes.quranAyah * 2.0,
  },
  adhkarText: {
    fontSize: arabicFontSizes.adhkar,
    fontWeight: '400',
    writingDirection: 'rtl',
    textAlign: 'center',
    lineHeight: arabicFontSizes.adhkar * 1.9,
  },

  // ─── Buttons ─────────────────────────────────────────────
  button: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonSmall: {
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  buttonTextSmall: {
    fontSize: 14,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  buttonOutline: {
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg, // RTL: left in code = right visually
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  // ─── Shadows ─────────────────────────────────────────────
  shadowLight: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  shadowMedium: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  shadowHeavy: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  // ─── Dividers ────────────────────────────────────────────
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing.sm,
  },
  dividerThick: {
    height: 1,
    marginVertical: spacing.md,
  },

  // ─── RTL Helpers ─────────────────────────────────────────
  rtlText: {
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  rtlRow: {
    flexDirection: 'row',
  },
  alignEnd: {
    alignItems: 'flex-end', // In RTL this is the start (right side)
  },
  alignStart: {
    alignItems: 'flex-start',
  },

  // ─── Spacing Helpers ─────────────────────────────────────
  mt_sm: { marginTop: spacing.sm },
  mt_md: { marginTop: spacing.md },
  mt_lg: { marginTop: spacing.lg },
  mb_sm: { marginBottom: spacing.sm },
  mb_md: { marginBottom: spacing.md },
  mb_lg: { marginBottom: spacing.lg },
  mh_sm: { marginHorizontal: spacing.sm },
  mh_md: { marginHorizontal: spacing.md },
  ph_sm: { paddingHorizontal: spacing.sm },
  ph_md: { paddingHorizontal: spacing.md },

  // ─── Badges / Chips ──────────────────────────────────────
  badge: {
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // ─── Input ───────────────────────────────────────────────
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    writingDirection: 'rtl',
    textAlign: 'right',
    minHeight: 48,
  },

  // ─── List Items ──────────────────────────────────────────
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    minHeight: 56,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    writingDirection: 'rtl',
    textAlign: 'right',
  },
  listItemSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    writingDirection: 'rtl',
    textAlign: 'right',
    marginTop: 2,
  },

  // ─── Section ─────────────────────────────────────────────
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    writingDirection: 'rtl',
    textAlign: 'right',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },

  // ─── Ornamental ──────────────────────────────────────────
  islamicBorder: {
    borderWidth: 2,
    borderRadius: borderRadius.lg,
  },
  ornamentalLine: {
    height: 2,
    borderRadius: 1,
    marginVertical: spacing.md,
    alignSelf: 'center',
    width: '40%',
  },
});

export default commonStyles;
