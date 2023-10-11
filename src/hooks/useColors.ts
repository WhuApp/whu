import { ColorSchemeName, useColorScheme } from 'react-native';
import { colors, ColorEntries } from '../utils/colors';

const useColors = () => {
  const colorScheme = useColorScheme();

  const color = (color: keyof ColorEntries, scheme: ColorSchemeName = colorScheme) => {
    return scheme === 'dark' ? colors[color].dark : colors[color].light;
  };

  return color;
};

export default useColors;
