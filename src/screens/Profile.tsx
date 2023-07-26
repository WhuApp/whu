import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Button } from '../components';
import ModalLayout from '../layouts/ModalLayout';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <ModalLayout
      title='Profile'
      onPressMore={() => { }}
    >
      <Button
        title='Sign Out'
        onPress={signOut}
      />
    </ModalLayout>
  );
};

export default Profile;
