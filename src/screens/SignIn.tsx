import React, { useState } from 'react';
import { Button, TextInput } from '../components';
import { useAuth } from '../components/AuthContext';
import ModalLayout from '../layouts/ModalLayout';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const handleSignIn = async () => {
    setLoading(true);

    const reason = await signIn(email, password);

    setError(reason);
    setLoading(false);
  };

  return (
    <ModalLayout title='Sign In' onPressMore={() => {}}>
      <TextInput label='E-Mail' error={error} onChangeText={setEmail} />
      <TextInput label='Password' error={error} secureTextEntry onChangeText={setPassword} />
      <Button title='Sign In' loading={loading} onPress={handleSignIn} />
    </ModalLayout>
  );
};

export default SignIn;
