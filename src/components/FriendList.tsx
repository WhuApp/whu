import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { Button } from './index';

// TODO: sort friends by timestamp
const FriendList: React.FC = () => {
  const friends = useGetFriends();

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
  });

  // Loading state
  // TODO: render skeleton model
  if (friends.isPending) {
    return <ActivityIndicator />;
  }

  // Error state
  if (friends.isError) {
    return (
      <>
        <Text style={styles.text}>An error occurred</Text>
        <Button title='Try Again' onPress={friends.refetch} />
      </>
    );
  }

  // Friend list empty
  if (friends.data && friends.data.length === 0) {
    return <Text style={styles.text}>You dont have any friends</Text>;
  }

  return (
    <VirtualizedList
      data={friends.data}
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
  const friend = useGetUser(userId);
  const friendLocation = useGetLocation(userId);

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

  // Loading state
  if (!location || friend.isPending || friendLocation.isPending) {
    return <Text style={styles.text}>Loading</Text>;
  }

  const distance = formatDistance(calculateDistance(location, friendLocation.data));
  const updatedAt = new Date(friendLocation.data.timestamp)
    .toTimeString()
    .split(' ')[0]
    .slice(0, -3);

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <Text style={styles.text}>{friend.data.nickname}</Text>
        {location && friendLocation && (
          <Text style={styles.text}>
            {distance.value}
            {distance.unit}
          </Text>
        )}
        <Compass loc={friendLocation.data} />
        {friendLocation && <Text style={styles.text}>{updatedAt}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export default FriendList;
