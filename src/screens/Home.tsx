import React from 'react';
import { Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

const Home: React.FC = () => {
  const { user } = useAuth0();

  return <Text>Logged in as {user.name}</Text>;
};

export default Home;
