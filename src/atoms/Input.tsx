import React, { ComponentPropsWithRef, ReactNode, Ref, forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useColors } from '../hooks';
import Icon from './Icon'

export interface InputProps extends ComponentPropsWithRef<typeof TextInput> {
  prefix?: ReactNode,
  suffix?: ReactNode,
  label?: string,
  required?: boolean,
  error?: string,
}

const InputBase = (props: InputProps, ref: Ref<TextInput>) => {
  const {
    prefix,
    suffix,
    label,
    required = false,
    error,
    ...rest
  } = props;

  const colors = useColors();
  const styles = StyleSheet.create({
    root: {
      gap: 8,
    },
    inputContainer: {
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderRadius: 10,
      backgroundColor: colors('backgroundTertiary'),
      borderWidth: error ? 1 : undefined,
      borderColor: error ? colors('errorText') : undefined,
    },
    input: {
      flexGrow: 1,
      color: colors('textPrimary'),
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    label: {
      color: colors('textPrimary'),
    },
    redText: {
      color: colors('errorText'),
    },
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        {required && <Text style={styles.redText}>*</Text>}
      </View>
      <View style={styles.inputContainer}>
        {prefix && (
          <View>
            {prefix}
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors('textTertiary')}
          autoCapitalize='none'
          ref={ref}
          {...rest}
        />
        {suffix && (
          <View>
            {suffix}
          </View>
        )}
      </View>
      {error && (
        <View style={styles.container}>
          <Icon
            name='alert-circle'
            size={16}
            color={colors('errorText')}
          />
          <Text style={styles.redText}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

export const Input = forwardRef<TextInput, InputProps>(InputBase);
