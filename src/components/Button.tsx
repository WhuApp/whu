import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useColors } from '../hooks';

interface ButtonProps {
  title: string;
  loading?: boolean;
  onPress?: () => void;
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
      color: colors('textPrimary', 'dark'),
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      disabled={loading}
      onPress={onPress}
    >
      {loading && (
        <ActivityIndicator
          size={'small'}
          color={colors('textPrimary', 'dark')}
        />
      )}
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
