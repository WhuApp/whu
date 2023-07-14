import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  useColorScheme,
} from 'react-native';
import { InsetView, Header } from '../components';
import { getStyles, Elements } from '../styles';
import { useAuth } from '../components/AuthContext';
import FriendList from '../components/FriendList';

const Home: React.FC = () => {
  const { session } = useAuth();
  const [name, setName] = useState<string>('Loading..');

  useEffect(() => {
    const fetchUser = async () => {
      setName(session.userId);
    };

    fetchUser();
  }, []);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={styles('page')}>
      <InsetView>
        <Header title={name} />
        <View style={{ padding: 15 }}>
          <FriendList />
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
}

export default Home;
