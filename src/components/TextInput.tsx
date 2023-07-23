import React from 'react';
import {
  View,
  Text,
  TextInput as NativeTextInpt,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useColors } from '../utils';

interface TextInputProps {
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  contentLeft?: React.ReactNode;
  contentRight?: React.ReactNode;
  onChangeText?: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  required,
  error,
  placeholder,
  secureTextEntry,
  contentLeft,
  contentRight,
  onChangeText
}) => {
  const colors = useColors();

  const rootStyle: ViewStyle = {
    gap: 8,
  };
  const topWrapperStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
  };
  const labelWrapperStyle: ViewStyle = {
    flexDirection: 'row',
    gap: 4,
  };
  const labelStyle: TextStyle = {
    color: colors('textPrimary'),
  };
  const requiredStyle: TextStyle = {
    color: colors('errorText'),
  };
  const errorStyle: TextStyle = {
    color: colors('errorText'),
  };
  const inputWrapperStyle: ViewStyle = {
    padding: 8,
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    backgroundColor: colors('backgroundTertiary'),
  };
  const inputStyle: TextStyle = {
    width: '100%',
    color: colors('textPrimary'),
  };

  return (
    <View style={rootStyle}>
      <View style={topWrapperStyle}>
        <View style={labelWrapperStyle}>
          {label && <Text style={labelStyle}>{label}</Text>}
          {required && <Text style={requiredStyle}>*</Text>}
        </View>
        {error && <Text style={errorStyle}>{error}</Text>}
      </View>
      <View style={inputWrapperStyle}>
        {contentLeft && contentLeft}
        <NativeTextInpt
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={colors('textTertiary')}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
        />
        {contentRight && contentRight}
      </View>
    </View>
  );
}

export default TextInput;
