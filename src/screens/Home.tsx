import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { useColors } from '../utils';

const Home: React.FC = () => {
  const { user, error } = useAuth0();
  const colors = useColors();

  return (
    <>
      <Text>Logged in as {user.name}</Text>
    </>
  );
};

export default Home;
