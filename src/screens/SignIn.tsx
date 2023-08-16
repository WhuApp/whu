import React, { useState } from 'react';
import { Button } from '../components';
import { useAuth0 } from 'react-native-auth0';
import { ModalLayout } from '../layouts';
import { Text } from 'react-native';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const { authorize } = useAuth0();

  const handleSignIn = async () => {
    setLoading(true);

    try {
      await authorize({}, {}); // TODO: understand this params
    } catch (e) {
      setError(e.toString());
    }

    setLoading(false);
  };

  return (
    <ModalLayout title='Sign In' onPressMore={() => {}}>
      <Button title='Sign In' loading={loading} onPress={handleSignIn} />
      {error && <Text>{error}</Text>}
    </ModalLayout>
  );
};

export default SignIn;
