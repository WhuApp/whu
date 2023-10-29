import React from 'react';
import { Button } from '../components';
import { useAuth0 } from 'react-native-auth0';
import { ActivityIndicator, Alert, Text } from 'react-native';
import { useColors } from '../hooks';
import { BaseLayout } from '../layouts';
import { useGetUser } from '../api/users';

const Profile: React.FC = () => {
  const { clearSession } = useAuth0();

  const self = useGetUser();

  const colors = useColors();

  const handleSignOut = () => {
    clearSession({}, {}).catch((e) => Alert.alert(e));
  };

  // Loading state
  if (self.isPending) {
    return <ActivityIndicator />;
  }

  return (
    <BaseLayout>
      <Text style={{ color: colors('textPrimary') }}>Signed in as {self.data.email}</Text>
      <Button title='Sign Out' onPress={handleSignOut} />
    </BaseLayout>
  );
};

export default Profile;
