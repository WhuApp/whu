import {
  ColorSchemeName,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

type Style = TextStyle | ViewStyle | ImageStyle;

export interface Elements {
  page?: Style;
  container?: Style;
  textInput?: Style;
  inputWrapper?: Style;
  label?: Style;
  link?: Style;
  error?: Style;
  text?: Style;
  title?: Style;
}

export const colors = {
  lightBackground: '#f2f2f2',
  lighterBackground: '#ffffff',
  darkBackground: '#313338',
  darkerBackground: '#1e1f22',
  lightTextPrimary: '#000000',
  lightTextSecondary: '#222222',
  lightTextTertiary: '#141414',
  darkTextPrimary: '#ffffff',
  darkTextSecondary: '#D3D3D3',
  darkTextTertiary: '#b5bac1',
  linkColor: '#4082E3',
  errorColor: '#FF3040',
};

const defaultStyles: Elements = {
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
  },
  textInput: {
    padding: 8,
    width: 350,
    borderRadius: 5,
  },
  inputWrapper: {
    gap: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  link: {
    color: colors.linkColor,
    fontWeight: '500',
  },
  error: {
    color: colors.errorColor,
  },
};

const lightStyles: Elements = {
  page: {
    backgroundColor: colors.lightBackground,
  },
  title: {
    color: colors.lightTextPrimary,
  },
  text: {
    color: colors.lightTextSecondary,
  },
  textInput: {
    backgroundColor: colors.lighterBackground,
    color: colors.lightTextPrimary,
  },
  label: {
    color: colors.lightTextTertiary,
  },
};

const darkStyles: Elements = {
  page: {
    backgroundColor: colors.darkBackground,
  },
  title: {
    color: colors.darkTextPrimary,
  },
  text: {
    color: colors.darkTextSecondary,
  },
  textInput: {
    backgroundColor: colors.darkerBackground,
    color: colors.darkTextPrimary,
  },
  label: {
    color: colors.darkTextTertiary,
  },
};

export const getStyles = (element: keyof Elements, theme: ColorSchemeName) => {
  return StyleSheet.compose(
    defaultStyles[element] ?? {},
    (theme === 'dark' ? darkStyles[element] : lightStyles[element]) ?? {},
  );
};
