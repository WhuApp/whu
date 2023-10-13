import React from 'react';
import { Input, InputProps } from '../../atoms/Input';

const TextInput: React.FC<InputProps> = ({ ...props }) => {
  return <Input {...props} />;
};

export default TextInput;
