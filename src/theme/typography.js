// ----------------------------------------------------------------------

export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

export const primaryFont = '"Inter", "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif';
export const secondaryFont = '"Inter", sans-serif';

// ----------------------------------------------------------------------

export const typography = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 800,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    fontSize: pxToRem(36),
    ...responsiveFontSizes({ sm: 44, md: 48, lg: 52 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: '-0.02em',
    fontSize: pxToRem(28),
    ...responsiveFontSizes({ sm: 32, md: 36, lg: 40 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.35,
    fontSize: pxToRem(22),
    ...responsiveFontSizes({ sm: 24, md: 26, lg: 28 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.4,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 22 }),
  },
  h5: {
    fontWeight: 600,
    lineHeight: 1.45,
    fontSize: pxToRem(17),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(15),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.6,
    fontSize: pxToRem(15),
  },
  body2: {
    lineHeight: 1.55,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(11),
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  button: {
    fontWeight: 600,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'none',
  },
};
