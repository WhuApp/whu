import React from 'react';
import { 
  Pressable, 
  View, 
  Text, 
  StyleSheet
} from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ onPress, text }) => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.text}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    backgroundColor: '#3C44F6',
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    color: '#FAFAFA',
  },
});

export default Button;
