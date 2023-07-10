import React from 'react';
import { useColorScheme, View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { getStyles, Elements } from '../styles';
import { StatusBar } from 'expo-status-bar';
import { Icon, InsetView } from '../components';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={[styles('page'), { padding: 15 }]}>
      <InsetView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles('title')}>Profile</Text>
          <TouchableOpacity
            style={styles('secondaryButton')}
            onPress={signOut}
          >
            <Icon name='log-out' />
          </TouchableOpacity>
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  )
};

export default Profile;
