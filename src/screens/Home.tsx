import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  useColorScheme,
} from 'react-native';
import { Button, InsetView } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types';
import { getStyles, Elements } from '../styles';
import { useAuth } from '../components/AuthContext';
import FriendList from '../components/FriendList';
import { GeoPoint } from '../Location';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { signOut, getSession, getLocation } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<GeoPoint>();
  const [name, setName] = useState<string>('Loading..');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getSession();
      setName(user.name);

      setLocation(await getLocation());
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    setLoading(true);
    signOut().then(() => setLoading(false));
  };

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={[styles('page'), { padding: 15 }]}>
      <InsetView style={styles('container')}>
        <Text style={styles('text')}>{name}</Text>
        <Text> 
          Latitude: {location?.latitude} 
          Longitude: {location?.longitude} 
          Altitude: {location?.altitude} 
        </Text>
        <FriendList />
        <Button text='Log Out' loading={loading} onPress={handleSignOut} />
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
}

export default Home;
