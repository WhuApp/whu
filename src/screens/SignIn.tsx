import React, { useState } from 'react';
import { Button, TextInput } from '../components';
import { useAuth0 } from 'react-native-auth0';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const { authorize } = useAuth0();

  const handleSignIn = async () => {
    setLoading(true);

    try {
      await authorize({}, {}); // TODO: understand this params
    } catch (e) {
      setError(e);
    }

    setLoading(false);
  };

  return <Button title='Sign In' loading={loading} onPress={handleSignIn} />;
};

export default SignIn;
