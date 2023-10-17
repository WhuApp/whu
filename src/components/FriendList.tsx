import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from 'react-native';
import { useColors } from '../hooks';
import { calculateDistance, formatDistance } from '../utils/location';
import Compass from './Compass';
import useFriendsV1 from '../services/friends_v1';
import useLocationsV1 from '../services/locations_v1';
import { RootStackParamList, TimedLocation, User } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useLocation from './context/LocationContext';
import useUsersV1 from '../services/users_v1';

const FriendList: React.FC = () => {
  const friendsService = useFriendsV1();
  const usersService = useUsersV1();
  const [friends, setFriends] = useState<User[]>([]);

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
  });

  useEffect(() => {
    (async () => {
      const friendIds = await friendsService.getFriendIds();
      const friendObjects = [];

      for (const id of friendIds) {
        const friend = await usersService.getUserInfo(id);
        friendObjects.push(friend);
      }

      setFriends(friendObjects);
    })();
  }, [friendsService, usersService]);

  if (!friends) return <ActivityIndicator />;
  if (friends.length === 0) {
    return <Text style={styles.text}>You dont have any friends</Text>;
  }
  return (
    <VirtualizedList
      data={friends}
      initialNumToRender={100}
      renderItem={({ item }) => <FriendListItem user={item} />}
      keyExtractor={(item: User) => item.userId}
      getItemCount={(o): number => o.length}
      getItem={(o, i): User => o[i]}
    />
  );
};

interface FriendListItemProps {
  user: User;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ user }) => {
  const { userId, nickname } = user;

  const [friendLocation, setFriendLocation] = useState<TimedLocation>(undefined);
  const { location } = useLocation();

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

  const locationContext = useLocationsV1();

  useEffect(() => {
    locationContext.getLocation(userId).then((timedLocation: TimedLocation) => {
      setFriendLocation(timedLocation);
    });
  }, [locationContext]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CompassView', { userId: userId });
  };

  if (!friendLocation || !location) {
    return <Text style={styles.text}>Loading</Text>;
  }

  const distance = formatDistance(Math.floor(calculateDistance(location, friendLocation)));

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.item}>
        <Text style={styles.text}>{nickname}</Text>
        {location && friendLocation && (
          <Text style={styles.text}>
            {distance.value}
            {distance.unit}
          </Text>
        )}
        <Compass loc={friendLocation} />
        {friendLocation && (
          <Text style={styles.text}>
            {new Date(friendLocation.timestamp).toTimeString().split(' ')[0].slice(0, -3)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default FriendList;
