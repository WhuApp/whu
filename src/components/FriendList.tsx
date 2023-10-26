import React from 'react';
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
import { RootStackParamList } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useLocation from './context/LocationContext';
import { useGetLocation } from '../api/locations';
import { useGetFriends } from '../api/friends';
import { useGetUser } from '../api/users';

const FriendList: React.FC = () => {
  const { data, isPending } = useGetFriends();

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
  });

  if (isPending) {
    return <ActivityIndicator />;
  }

  if (data.length === 0) {
    return <Text style={styles.text}>You dont have any friends</Text>;
  }

  return (
    <VirtualizedList
      data={data}
      initialNumToRender={100}
      renderItem={({ item }) => <FriendListItem userId={item} />}
      keyExtractor={(item: string) => item}
      getItemCount={(o): number => o.length}
      getItem={(o, i): string => o[i]}
    />
  );
};

interface FriendListItemProps {
  userId: string;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ userId }) => {
  const { location } = useLocation();

  const { data: friend, isPending: friendPending } = useGetUser(userId);
  const { data: friendLocation, isPending: friendLocationPending } = useGetLocation(userId);

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

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CompassView', { userId: userId });
  };

  if (!location || friendPending || friendLocationPending) {
    return <Text style={styles.text}>Loading</Text>;
  }

  const distance = formatDistance(calculateDistance(location, friendLocation));

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.item}>
        <Text style={styles.text}>{friend.nickname}</Text>
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
