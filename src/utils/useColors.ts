import { useColorScheme } from 'react-native';
import { colors, ColorEntries } from '../colors';

const useColors = () => {
  const colorScheme = useColorScheme();

  const color = (color: keyof ColorEntries) =>
    colorScheme === 'dark' ? colors[color].dark : colors[color].light;

  return color;
};

export default useColors;
