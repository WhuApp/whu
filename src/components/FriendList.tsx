import React, { useEffect, useState } from 'react';
import { Text, useColorScheme } from 'react-native';
import { useAuth } from './AuthContext';
import { getStyles, Elements } from '../styles';

const FriendList: React.FC = () => {
  const { getFriends } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState([]);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  useEffect(() => {
    getFriends().then((friendIds) => {
      setFriends(friendIds);
      setLoading(false);
    });
  }, []);

  if (loading) return <Text>Loading..</Text>;
  if (!friends.length) return <Text style={styles('text')}>You dont have any friends</Text>;

  return (
      <>
        {friends.map((friend, index) => (
          <FriendListItem key={index} friend={friend} />
        ))}
      </>
  );
};

interface FriendListItemProps {
  friend: string;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return <Text style={styles('text')}>{friend}</Text>;
};

export default FriendList;
