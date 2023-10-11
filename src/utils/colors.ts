type Color = {
  light: string;
  dark: string;
};

export interface ColorEntries {
  accent: Color;

  backgroundPrimary: Color;
  backgroundSecondary: Color;
  backgroundTertiary: Color;

  textPrimary: Color;
  textSecondary: Color;
  textTertiary: Color;

  errorText: Color;
  linkText: Color;
}

export const colors: ColorEntries = {
  accent: {
    light: '#3C44F6',
    dark: '#3C44F6',
  },
  backgroundPrimary: {
    light: '#ffffff',
    dark: '#313338',
  },
  backgroundSecondary: {
    light: '#f7f8fa',
    dark: '#2b2d31',
  },
  backgroundTertiary: {
    light: '#ebecee',
    dark: '#1e1f22',
  },
  textPrimary: {
    light: '#000000',
    dark: '#ffffff',
  },
  textSecondary: {
    light: '#141414',
    dark: '#D3D3D3',
  },
  textTertiary: {
    light: '#BBBBBB',
    dark: '#888888',
  },
  errorText: {
    light: '#FF3040',
    dark: '#FF3040',
  },
  linkText: {
    light: '#4082E3',
    dark: '#4082E3',
  },
};
