import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  useColorScheme,
} from 'react-native';
import { Button, InsetView } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types';
import { getAuth } from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { getStyles, Elements } from '../styles';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [signOut, loading,] = useSignOut(auth);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={[styles('page'), { padding: 15 }]}>
      <InsetView style={styles('container')}>
        <Text style={styles('text')}>{user.email}</Text>
        <Button text='Log Out' loading={loading} onPress={signOut} />
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
}

export default Home;
