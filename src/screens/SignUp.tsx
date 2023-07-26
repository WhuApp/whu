import React, { useState } from 'react';
import { Button, TextInput } from '../components';
import { useAuth } from '../components/AuthContext';
import { AppwriteException } from 'appwrite';
import ModalLayout from '../layouts/ModalLayout';

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const handleSignUp = async () => {
    setLoading(true);

    if (password != repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signUp(name, mail, password);
    } catch (reason: unknown) {
      setError((reason as AppwriteException).message);
    }

    setLoading(false);
  };

  return (
    <ModalLayout
      title='Sign Up'
      onPressMore={() => { }}
    >
      <TextInput
        label='Name'
        required
        error={error}
        onChangeText={setName}
      />
      <TextInput
        label='E-Mail'
        required
        error={error}
        onChangeText={setMail}
      />
      <TextInput
        label='Password'
        required
        error={error}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        label='Repeat Password'
        required
        error={error}
        secureTextEntry
        onChangeText={setRepeatPassword}
      />
      <Button
        title='Sign Up'
        loading={loading}
        onPress={handleSignUp}
      />
    </ModalLayout>
  );
};

export default SignUp;
