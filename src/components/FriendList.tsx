import React, { useEffect, useState } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { getStyles, Elements } from '../styles';
import type { Friend } from '../types';
import { getFriends } from '../services/friends';
import { useLiveHeading, useLiveLocation } from '../utils';
import { calculateBearing, calculateDistance } from '../location';
import Compass from './Compass';

const FriendList: React.FC = () => {
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
    <View>
      <Text style={styles('title')}>Friends</Text>
      {friends.map((friend, index) => (
        <FriendListItem key={index} friend={friend} />
      ))}
    </View>
  );
};

interface FriendListItemProps {
  friend: Friend;
};

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const location = useLiveLocation();
  const heading = useLiveHeading();

  const calcDistance = () => Math.floor(calculateDistance(location, friend.location));
  
  const calcHeading = () => (Math.floor(calculateBearing(location, friend.location) - heading) + 360) % 360;

  return (
    <View style={[styles('listItem'), { width: '100%' }]}>
      <Text style={styles('text')}>{friend.name}</Text>
      {location && <Text style={styles('text')}>{calcDistance()}m</Text>}
      {heading && location && <Text style={styles('text')}>{calcHeading()}°</Text>}
      {heading && location && <Compass direction={calcHeading()} />}
      <Text style={styles('text')}>{friend.location.timestamp.toTimeString().split(' ')[0].slice(0, -3)}</Text>
    </View>
  )
};

export default FriendList;
