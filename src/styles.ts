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
  secondaryButton?: Style;
  primaryButton?: Style;
  listItem?: Style;
}

export const colors = {
  lightBackgroundPrimary: '#ffffff',
  lightBackgroundSecondary: '#f7f8fa',
  lightBackgroundTertiary: '#ebecee',
  darkBackgroundPrimary: '#313338',
  darkBackgroundSecondary: '#2b2d31',
  darkBackgroundTertiary: '#1e1f22',
  lightTextPrimary: '#000000',
  lightTextSecondary: '#141414',
  lightTextTertiary: '#BBBBBB',
  darkTextPrimary: '#ffffff',
  darkTextSecondary: '#D3D3D3',
  darkTextTertiary: '#888888',
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
    borderRadius: 5,
    minWidth: 350,
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
  primaryButton: {
    backgroundColor: '#3C44F6',
    flexDirection: 'row',
    width: 200,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 20,
  },
  secondaryButton: {
    borderRadius: 100,
    padding: 6,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 8,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
};

const lightStyles: Elements = {
  page: {
    backgroundColor: colors.lightBackgroundPrimary,
  },
  title: {
    color: colors.lightTextPrimary,
  },
  label: {
    color: colors.lightTextSecondary,
  },
  text: {
    color: colors.lightTextPrimary,
  },
  textInput: {
    backgroundColor: colors.lightBackgroundTertiary,
    color: colors.lightTextPrimary,
  },
  secondaryButton: {
    backgroundColor: colors.lightBackgroundTertiary,
  },
  listItem: {
    backgroundColor: colors.lightBackgroundSecondary,
    borderBottomColor: colors.lightBackgroundTertiary,
  },
};

const darkStyles: Elements = {
  page: {
    backgroundColor: colors.darkBackgroundPrimary,
  },
  title: {
    color: colors.darkTextPrimary,
  },
  label: {
    color: colors.darkTextSecondary,
  },
  text: {
    color: colors.darkTextPrimary,
  },
  textInput: {
    backgroundColor: colors.darkBackgroundTertiary,
    color: colors.darkTextPrimary,
  },
  secondaryButton: {
    backgroundColor: colors.darkBackgroundTertiary,
  },
  listItem: {
    backgroundColor: colors.darkBackgroundSecondary,
    borderBottomColor: colors.darkBackgroundTertiary,
  },
};

export const getStyles = (element: keyof Elements, theme: ColorSchemeName) => {
  return StyleSheet.compose(
    defaultStyles[element] ?? {},
    (theme === 'dark' ? darkStyles[element] : lightStyles[element]) ?? {},
  );
};
