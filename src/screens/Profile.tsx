import React from 'react';
import { Button } from '../components';
import { useAuth0 } from 'react-native-auth0';
import { Alert, Text } from 'react-native';
import { useColors } from '../hooks';
import { BaseLayout } from '../layouts';

const Profile: React.FC = () => {
  const { clearSession, user } = useAuth0();
  const colors = useColors();

  const handleSignOut = () => {
    clearSession({}, {}).catch((e) => Alert.alert(e));
  };

  return (
    <BaseLayout>
      {user && <Text style={{ color: colors('textPrimary') }}>Signed in as {user.name}</Text>}
      <Button title='Sign Out' onPress={handleSignOut} />
    </BaseLayout>
  );
};

export default Profile;
