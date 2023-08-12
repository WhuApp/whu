import React from 'react';
import { Button } from '../components';
import ModalLayout from '../layouts/ModalLayout';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const Profile: React.FC = () => {
  const { clearSession } = useAuth0();

  const onPress = async () => {
    try {
      await clearSession({}, {});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalLayout title='Profile' onPressMore={() => {}}>
      <Button title='Sign Out' onPress={onPress} />
    </ModalLayout>
  );
};

export default Profile;
