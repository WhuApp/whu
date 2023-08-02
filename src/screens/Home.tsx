import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useAuth } from '../components/AuthContext';
import FriendList from '../components/FriendList';
import { useColors } from '../hooks';

const Home: React.FC = () => {
  const { session } = useAuth();
  const [name, setName] = useState<string>('Loading..');
  const colors = useColors();

  useEffect(() => {
    const fetchUser = async () => {
      setName(session.userId);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Text style={{ color: colors('textPrimary') }}>
        {name}
      </Text>
      <FriendList />
    </>
  );
}

export default Home;
