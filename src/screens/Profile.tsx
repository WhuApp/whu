import React from 'react';
import { Button } from '../components';
import ModalLayout from '../layouts/ModalLayout';
import { useAuth0 } from 'react-native-auth0';
import { Alert, Text } from 'react-native';
import { useColors } from '../hooks';

const Profile: React.FC = () => {
  const { clearSession, user } = useAuth0();
  const colors = useColors();

  const handleSignOut = () => {
    clearSession({}, {}).catch((e) => Alert.alert(e));
  };

  return (
    <ModalLayout title='Profile' onPressMore={() => {}}>
      {user && <Text style={{ color: colors('textPrimary') }}>Signed in as {user.name}</Text>}
      <Button title='Sign Out' onPress={handleSignOut} />
    </ModalLayout>
  );
};

export default Profile;
