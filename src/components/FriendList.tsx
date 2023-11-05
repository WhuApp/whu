import React, { useMemo } from 'react';
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
import { RootStackParamList, TimedLocation } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import useLocation from './context/LocationContext';
import Button from './button/Button';
import dayjs from 'dayjs';
import { gql, useQuery } from 'urql';
import { isDevelopmentBuild } from 'expo-dev-client';

// TODO: sort friends by timestamp
const FriendList: React.FC = () => {
  const [friends, reloadFriends] = useQuery({
    query: gql`
      query {
        friends {
          ...FriendListItemFragment
        }
      }
      ${FriendListItemFragment}
    `,
  });

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors('textPrimary'),
    },
  });

  // Loading state
  // TODO: render skeleton model
  if (friends.fetching) {
    return <ActivityIndicator />;
  }

  // Error state
  if (friends.error) {
    return (
      <>
        <Text style={styles.text}>An error occurred</Text>
        {isDevelopmentBuild() && <Text style={styles.text}>{friends.error.toString()}</Text>}
        <Button title='Try Again' onPress={reloadFriends} />
      </>
    );
  }

  // Friend list empty
  if (friends.data && friends.data.length === 0) {
    return <Text style={styles.text}>You dont have any friends</Text>;
  }

  return (
    <VirtualizedList
      data={friends.data.friends as FriendListItemType[]}
      initialNumToRender={100}
      renderItem={(obj) => <FriendListItem {...obj.item} />}
      keyExtractor={(item: FriendListItemType) => item.id}
      getItemCount={(o): number => o.length}
      getItem={(o, i): FriendListItemType => o[i]}
    />
  );
};

const TimedLocationFragment = gql`
  fragment TimedLocationFragment on Location {
    altitude
    latitude
    longitude
    timestamp
  }
`;

const FriendListItemFragment = gql`
  fragment FriendListItemFragment on User {
    nickname
    id
    location {
      ...TimedLocationFragment
    }
  }

  ${TimedLocationFragment}
`;

type FriendListItemType = {
  nickname: string;
  id: string;
  location: TimedLocation;
};

const FriendListItem: React.FC<FriendListItemType> = ({
  nickname,
  id,
  location: friendLocation,
}) => {
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

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('CompassView', { userId: id });
  };

  const distance = useMemo(
    () => location && friendLocation && formatDistance(calculateDistance(location, friendLocation)),
    [location, friendLocation]
  );
  const updatedAt = dayjs(friendLocation.timestamp).fromNow();

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <Text style={styles.text}>{nickname}</Text>
        {location && friendLocation && (
          <>
            <Text style={styles.text}>
              {distance.value}
              {distance.unit}
            </Text>
            <Compass loc={friendLocation} />
            <Text style={styles.text}>{updatedAt}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FriendList;
