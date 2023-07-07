import React, { useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { getStyles, Elements } from '../styles';
import { StatusBar } from 'expo-status-bar';
import { Button, InsetView } from '../components';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const handleSignOut = () => {
    setLoading(true);
    signOut().then(() => setLoading(false));
  };

  return (
    <View style={styles('page')}>
      <InsetView>
        <Button
          text='Sign out'
          loading={loading}
          onPress={handleSignOut}
        />
      </InsetView>
      <StatusBar style='auto' />
    </View>
  )
};

export default Profile;
