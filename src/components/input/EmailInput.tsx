import React, { useState } from 'react';
import { Input, InputProps } from '../../atoms/Input';

const EmailInput: React.FC<InputProps> = ({ onChangeText, ...rest }) => {
  const [error, setError] = useState<string>(null);

  const emailRegex = /^\S+@\S+\.\S+$/;

  const handleChangeText = (text: string) => {
    setError(emailRegex.test(text) ? null : 'Invalid E-Mail');
    if (onChangeText) onChangeText(text);
  }

  return (
    <Input
      onChangeText={handleChangeText}
      error={error}
      inputMode='email'
      {...rest}
    />
  );
}

export default EmailInput;
