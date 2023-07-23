import React from 'react';
import { Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useColors } from '../utils';

interface ButtonProps {
  title: string;
  loading?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  loading,
}) => {
  const colors = useColors();

  const styles = StyleSheet.create({
    button: {
      minWidth: 180,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
      backgroundColor: colors('accent'),
    },
    text: {
      color: colors('textPrimary'),
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {loading && (
        <ActivityIndicator
          size={'small'}
          color={colors('textPrimary')}
        />
      )}
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
