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
import { RootStackParamList, TimedLocation } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useLocation from './context/LocationContext';

const FriendList: React.FC = () => {
  const friendsV1 = useFriendsV1();
  const [friendIds, setFriendIds] = useState<string[] | undefined>(undefined);

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
  });

  useEffect(() => {
    (async () => {
      const friendIds = await friendsV1.getFriendIds();

      setFriendIds(friendIds);
    })();
  }, [friendsV1]);

  if (!friendIds) return <ActivityIndicator />;
  if (friendIds.length === 0) {
    return <Text style={styles.text}>You dont have any friends</Text>;
  }
  return (
    <VirtualizedList
      data={friendIds}
      initialNumToRender={100}
      renderItem={({ item }) => {
        return <FriendListItem friendId={item} />;
      }}
      keyExtractor={(item: string) => item}
      getItemCount={(o): number => o.length}
      getItem={(o, i): string => o[i]}
    />
  );
};

interface FriendListItemProps {
  friendId: string;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friendId }) => {
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
    locationContext.getLocation(friendId).then((timedLocation: TimedLocation) => {
      setFriendLocation(timedLocation);
    });
  }, [locationContext]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CompassView', { userId: friendId });
  };

  if (!friendLocation || !location) {
    return <Text style={styles.text}>Loading</Text>;
  }

  const distance = formatDistance(Math.floor(calculateDistance(location, friendLocation)));

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.item}>
        <Text style={styles.text}>{friendId}</Text>
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
