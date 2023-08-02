import React, { useState } from 'react';
import { EmailInput, PasswordInput, Button } from '../components';
import ModalLayout from '../layouts/ModalLayout';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <ModalLayout
      title='Sign In'
      onPressMore={() => { }}
    >
      <EmailInput
        label='E-Mail'
        onChangeText={setEmail}
      />
      <PasswordInput
        label='Password'
        onChangeText={setPassword}
      />
      <Button title='Sign In' />
    </ModalLayout>
  );
};

export default SignIn;
