import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------
// Sales Dashboard design system – slate + sky blue accent
// ----------------------------------------------------------------------

export const grey = {
  0: '#FFFFFF',
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
};

export const primary = {
  lighter: '#e0f2fe',
  light: '#38bdf8',
  main: '#0ea5e9',
  dark: '#0284c7',
  darker: '#0369a1',
  contrastText: '#FFFFFF',
};

export const secondary = {
  lighter: '#f3e8ff',
  light: '#a78bfa',
  main: '#8b5cf6',
  dark: '#6d28d9',
  darker: '#5b21b6',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#e0f2fe',
  light: '#38bdf8',
  main: '#0ea5e9',
  dark: '#0284c7',
  darker: '#0369a1',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#dcfce7',
  light: '#22c55e',
  main: '#16a34a',
  dark: '#15803d',
  darker: '#166534',
  contrastText: '#FFFFFF',
};

export const warning = {
  lighter: '#fef3c7',
  light: '#f59e0b',
  main: '#d97706',
  dark: '#b45309',
  darker: '#92400e',
  contrastText: grey[800],
};

export const error = {
  lighter: '#fee2e2',
  light: '#f87171',
  main: '#ef4444',
  dark: '#dc2626',
  darker: '#b91c1c',
  contrastText: '#FFFFFF',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(primary.main, 0.12),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(primary.main, 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.12),
  action,
};

export function palette() {
  return {
    ...base,
    mode: 'light',
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: '#FFFFFF',
      default: grey[50],
      neutral: grey[100],
    },
    action: {
      ...base.action,
      active: grey[700],
    },
  };
}
