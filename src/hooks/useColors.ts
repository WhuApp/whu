import { ColorSchemeName, useColorScheme } from 'react-native';
import { ColorEntries, colors } from '../utils/colors';

const useColors = () => {
  const colorScheme = useColorScheme();

  return (color: keyof ColorEntries, scheme: ColorSchemeName = colorScheme) => {
    return scheme === 'dark' ? colors[color].dark : colors[color].light;
  };
};

export default useColors;
