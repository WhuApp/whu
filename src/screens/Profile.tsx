import React from 'react';
import { Button } from '../components';
import ModalLayout from '../layouts/ModalLayout';
import { useAuth0 } from 'react-native-auth0';
import { Alert } from 'react-native';

const Profile: React.FC = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession({}, {});
    } catch (e) {
      Alert.alert(e);
    }
  };

  return (
    <ModalLayout title='Profile' onPressMore={() => {}}>
      <Button title='Sign Out' onPress={onPress} />
    </ModalLayout>
  );
};

export default Profile;
