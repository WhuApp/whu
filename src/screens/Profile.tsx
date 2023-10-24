import React from 'react';
import { Button } from '../components';
import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { useColors } from '../hooks';
import { BaseLayout } from '../layouts';
import { getUser } from '../api/users';

const Profile: React.FC = () => {
  const { clearSession } = useAuth0();

  const { data, isPending } = getUser();

  const colors = useColors();

  const handleSignOut = () => {
    clearSession({}, {}).catch((e) => Alert.alert(e));
  };

  return (
    <BaseLayout>
      {isPending ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ color: colors('textPrimary') }}>Signed in as {data.email}</Text>
      )}
      <Button title='Sign Out' onPress={handleSignOut} />
    </BaseLayout>
  );
};

export default Profile;
