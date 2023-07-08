import React from 'react';
import {
  Pressable,
  View,
  Text,
  useColorScheme,
  ViewProps,
  ActivityIndicator,
} from 'react-native';
import { getStyles, Elements } from '../styles';

interface ButtonProps {
  text: string;
  loading?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps & ViewProps> = ({
  onPress,
  text,
  loading = false,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View {...props}>
      <Pressable onPress={onPress} style={styles('primaryButton')}>
        {loading && <ActivityIndicator size={'small'} color={'#FAFAFA'} />}
        <Text style={styles('text')}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
