import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import { useColors, useLiveHeading, useLiveLocation } from "../utils";
import { calculateBearing, calculateDistance } from "../location";
import Compass from "./Compass";
import { useFriendsV1 } from "../services/friend_v1";

const FriendList: React.FC = () => {
  const friendsV1 = useFriendsV1();
  const [friendIds, setFriendIds] = useState<string[] | undefined>(undefined);

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors("textPrimary"),
    },
  });

  useEffect(() => {
    (async () => {
      if (friendsV1) {
        const friendids = await friendsV1.getFriendIds();

        setFriendIds(friendids);
      }
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
  const location = useLiveLocation();
  const heading = useLiveHeading();

  const colors = useColors();
  const styles = StyleSheet.create({
    text: {
      color: colors("textPrimary"),
    },
    item: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors("backgroundSecondary"),
      padding: 8,
      borderBottomWidth: 1,
      alignItems: "center",
    },
  });

  // const calcDistance = () =>
  //   Math.floor(calculateDistance(location, friend.location));

  // const calcHeading = () =>
  //   (Math.floor(calculateBearing(location, friend.location) - heading) + 360) %
  //   360;

  // const time = () =>
  //   (friend.lastLocationUpdate as Date).toTimeString().split(" ")[0].slice(
  //     0,
  //     -3,
  //   );

  return (
    <View style={styles.item}>
      <Text style={styles.text}>{friendId}</Text>
      {
        /* {location && <Text style={styles.text}>{calcDistance()}m</Text>}
      {heading && location && <Text style={styles.text}>{calcHeading()}°</Text>}
      {heading && location && <Compass direction={calcHeading()} />}
      <Text style={styles.text}>{time()}</Text> */
      }
    </View>
  );
};

export default FriendList;
