// src/constants/typography.ts - ИСПРАВЛЕННЫЙ ПОД ВАШИ ФАЙЛЫ
export const Fonts = {
  // Точные названия из ваших файлов
  black: 'SanFranciscoDisplay-Black',
  bold: 'SanFranciscoDisplay-Bold', 
  heavy: 'SanFranciscoDisplay-Heavy',
  light: 'SanFranciscoDisplay-Light',
  medium: 'SanFranciscoDisplay-Medium',
  regular: 'SanFranciscoDisplay-Regular',
  semibold: 'SanFranciscoDisplay-Semibold',
  thin: 'SanFranciscoDisplay-Thin',
  ultralight: 'SanFranciscoDisplay-Ultralight',
};

export const Typography = {
  largeTitle: {
    fontFamily: Fonts.bold,
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: -0.5,
  },
  title1: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  title2: {
    fontFamily: Fonts.semibold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  title3: {
    fontFamily: Fonts.semibold,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  headline: {
    fontFamily: Fonts.semibold,
    fontSize: 17,
    lineHeight: 22,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: 17,
    lineHeight: 22,
  },
  callout: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 21,
  },
  subhead: {
    fontFamily: Fonts.regular,
    fontSize: 15,
    lineHeight: 20,
  },
  footnote: {
    fontFamily: Fonts.regular,
    fontSize: 13,
    lineHeight: 18,
  },
  caption1: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  caption2: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    lineHeight: 13,
  },
};

export const TextStyles = {
  screenTitle: Typography.largeTitle,
  sectionHeader: Typography.title2,
  cardTitle: Typography.headline,
  cardSubtitle: Typography.subhead,
  body: Typography.body,
  bodyBold: {
    ...Typography.body,
    fontFamily: Fonts.semibold,
  },
  secondary: Typography.footnote,
  tertiary: Typography.caption1,
  buttonLarge: {
    fontFamily: Fonts.semibold,
    fontSize: 17,
    lineHeight: 22,
  },
  button: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 20,
  },
  buttonSmall: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 18,
  },
};

export default Typography;