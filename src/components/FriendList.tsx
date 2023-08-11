import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Friend } from '../types';
import { getFriends } from '../services/friends';
import { useColors, useLiveHeading, useLiveLocation } from '../utils';
import { calculateBearing, calculateDistance } from '../location';
import Compass from './Compass';

const FriendList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<Friend[]>([]);

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
  });

  useEffect(() => {
    (async () => {
      setLoading(true);

      const friends = await getFriends();

      if (typeof friends === 'string') {
        console.log(friends);
      } else {
        setFriends(friends);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return <Text style={styles.text}>Loading..</Text>;
  if (!friends.length) return <Text style={styles.text}>You dont have any friends</Text>;

  return (
    <View>
      {friends.map((friend, index) => (
        <FriendListItem key={index} friend={friend} />
      ))}
    </View>
  );
};

interface FriendListItemProps {
  friend: Friend;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  const location = useLiveLocation();
  const heading = useLiveHeading();

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
    item: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors('backgroundSecondary'),
      padding: 8,
      borderBottomWidth: 1,
      alignItems: 'center',
    },
  });

  const calcDistance = () => Math.floor(calculateDistance(location, friend.location));

  const calcHeading = () =>
    (Math.floor(calculateBearing(location, friend.location) - heading) + 360) % 360;

  const time = () => (friend.lastLocationUpdate as Date).toTimeString().split(' ')[0].slice(0, -3);

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{friend.name}</Text>
      {location && <Text style={styles.text}>{calcDistance()}m</Text>}
      {heading && location && <Text style={styles.text}>{calcHeading()}°</Text>}
      {heading && location && <Compass direction={calcHeading()} />}
      <Text style={styles.text}>{time()}</Text>
    </View>
  );
};

export default FriendList;
