import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  ViewProps,
  ActivityIndicator
} from 'react-native';

interface ButtonProps {
  text: string;
  loading?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps & ViewProps> = ({ onPress, text, loading = false, ...props }) => {
  return (
    <View {...props}>
      <Pressable onPress={onPress} style={styles.button}>
        {loading && <ActivityIndicator size={'small'} color={'#FAFAFA'} />}
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: '#3C44F6',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: '#FAFAFA',
  },
});

export default Button;
