import React, { useState } from 'react';
import { Button, TextInput } from '../components';
import { useAuth } from '../components/AuthContext';
import { AppwriteException } from 'appwrite';
import ModalLayout from '../layouts/ModalLayout';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const handleSignIn = async () => {
    setLoading(true);

    try {
      await signIn(mail, password);
    } catch (reason: unknown) {
      setError((reason as AppwriteException).message);
    }

    setLoading(false);
  };

  return (
    <ModalLayout
      title='Sign In'
      onPressMore={() => { }}
    >
      <TextInput
        label='E-Mail'
        error={error}
        onChangeText={setMail}
      />
      <TextInput
        label='Password'
        error={error}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        text='Sign In'
        loading={loading}
        onPress={handleSignIn}
      />
    </ModalLayout>
  );
};

export default SignIn;
