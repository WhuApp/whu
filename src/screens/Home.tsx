import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  useColorScheme,
} from 'react-native';
import { InsetView, Header } from '../components';
import { getStyles, Elements } from '../styles';
import { useAuth } from '../components/AuthContext';
import FriendList from '../components/FriendList';
import { GeoPoint } from '../location';

const Home: React.FC = () => {
  const { session, getLocation } = useAuth();
  const [location, setLocation] = useState<GeoPoint>();
  const [name, setName] = useState<string>('Loading..');

  useEffect(() => {
    const fetchUser = async () => {
      setName(session.userId);

      setLocation(await getLocation());
    };

    fetchUser();
  }, []);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={styles('page')}>
      <InsetView>
        <Header title={name} />
        <View style={[styles('container')]}>
          <Text style={styles('text')}>
            Latitude: {location?.latitude + "\n"} 
            Longitude: {location?.longitude + "\n"} 
            Altitude: {location?.altitude + "\n"} 
          </Text>
          <FriendList />
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
}

export default Home;
