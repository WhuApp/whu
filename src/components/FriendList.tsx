import React, { useEffect, useState } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { useAuth } from './AuthContext';
import { getStyles, Elements } from '../styles';
import { Friend } from '../types';

const FriendList: React.FC = () => {
  const { getFriends } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<Friend[]>([]);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  useEffect(() => {
    getFriends().then((friends) => {
      setFriends(friends);
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
  friend: Friend;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View>
      <Text style={styles('text')}>{friend.name}</Text>
      <Text style={styles('text')}>longitude: {friend.location.longitude.toLocaleString(undefined, {minimumFractionDigits: 6},)}</Text>
      <Text style={styles('text')}>latitude: {friend.location.latitude.toLocaleString(undefined, {minimumFractionDigits: 6},)}</Text>
      <Text style={styles('text')}>altitude: {friend.location.altitude.toLocaleString(undefined, {minimumFractionDigits: 6},)}</Text>
      <Text style={styles('text')}>{friend.location.timestamp.toString()}</Text>
    </View>
  )
};

export default FriendList;
