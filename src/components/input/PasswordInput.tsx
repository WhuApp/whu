import React, { useState } from 'react';
import { Input, InputProps } from '../../atoms/Input';
import { TouchableOpacity } from 'react-native';
import Icon from '../../atoms/Icon';

const PasswordInput: React.FC<InputProps> = ({ onChangeText, ...rest }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);

  const numberRegex = /\d/;
  const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

  const handleChangeText = (text: string) => {
    if (text.length < 8)
      setError('Password too short (At least 8 characters)');
    else if (text.length > 32)
      setError('Password too long (At most 32 characters)');
    else if (!text.match(numberRegex))
      setError('Password requires at least 1 number');
    else if (!text.match(specialCharacterRegex))
      setError('Password requires at least 1 special character');
    else
      setError(null);

    if (onChangeText) onChangeText(text);
  }

  const HideToggle = (
    <TouchableOpacity onPress={() => setHidden(hidden => !hidden)}>
      <Icon name={hidden ? 'eye' : 'eye-off'} />
    </TouchableOpacity>
  );

  return (
    <Input
      onChangeText={handleChangeText}
      error={error}
      suffix={HideToggle}
      secureTextEntry={hidden}
      {...rest}
    />
  );
}

export default PasswordInput;
