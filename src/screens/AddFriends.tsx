import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon, TextInput } from "../components";
import { useColors } from "../utils";
import ModalLayout from "../layouts/ModalLayout";
import { useFriendsV1 } from "../services/friend_v1";
import { useUsersV1 } from "../services/users_v1";

interface RequestsProps {
  requests: string[];
}

const AddFriends: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [incoming, setIncoming] = useState(undefined);
  const [outgoing, setOutgoing] = useState(undefined);
  const friendsV1 = useFriendsV1();
  const usersV1 = useUsersV1();
  const colors = useColors();

  const styles = StyleSheet.create({
    iconWrapper: {
      flexDirection: "row",
      gap: 8,
    },
    label: {
      color: colors("textSecondary"),
    },
  });

  useEffect(() => {
    (async () => {
      if (friendsV1) {
        const data = await friendsV1.getIncomingFriendRequests();
        setIncoming(data);
      }
    })();
  }, [friendsV1]);

  useEffect(() => {
    (async () => {
      if (friendsV1) {
        const data = await friendsV1.getOutgoingFriendRequests();
        setOutgoing(data);
      }
    })();
  }, [friendsV1]);

  const handleAdd = async () => {
    console.log("input " + input);
    const ids = await usersV1.findUserByNickname(input);
    console.log("ids " + JSON.stringify(ids));
    if (ids.length > 1) {
      Alert.alert("Error", "Too many users?!");
    } else if (ids.length == 0) {
      Alert.alert("Error", "Could not find user!");
    } else {
      console.log("found " + ids[0]);
      const reason = await friendsV1.sendFriendRequestTo(ids[0]);

      if (reason) {
        Alert.alert("Error", reason);
      }
    }
  };

  return (
    <ModalLayout title="Add Friends" onPressMore={() => {}}>
      <TextInput
        placeholder="Search.."
        onChangeText={setInput}
        contentLeft={<Icon name="search" />}
        contentRight={
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={handleAdd}>
              <Icon name="arrow-right" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="camera" />
            </TouchableOpacity>
          </View>
        }
      />
      {incoming && incoming.length > 0 && (
        <>
          <Text style={styles.label}>Added Me</Text>
          <IncomingRequests requests={incoming} />
        </>
      )}
      {outgoing && outgoing.length > 0 && (
        <>
          <Text style={styles.label}>Pending</Text>
          <OutgoingRequests requests={outgoing} />
        </>
      )}
    </ModalLayout>
  );
};

const IncomingRequests: React.FC<RequestsProps> = ({ requests }) => {
  const colors = useColors();
  const friendsV1 = useFriendsV1();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: "hidden",
      backgroundColor: colors("backgroundSecondary"),
    },
    icon: {
      padding: 8,
      backgroundColor: colors("backgroundTertiary"),
      borderRadius: 10000,
    },
    item: {
      flexDirection: "row",
      paddingHorizontal: 6,
      paddingVertical: 3,
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors("backgroundTertiary"),
    },
    text: {
      color: colors("textPrimary"),
    },
    iconWrapper: {
      flexDirection: "row",
      gap: 8,
    },
  });

  const handleAccept = async (id: string) => {
    const reason = await friendsV1.acceptRequest(id);

    if (reason) {
      console.log(reason);
    }
  };

  const handleDecline = async (id: string) => {
    const reason = await friendsV1.declineRequest(id);

    if (reason) {
      console.log(reason);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((user) => (
        <View style={styles.item} key={user}>
          <Text style={styles.text}>{user}</Text>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleAccept(user)}
            >
              <Icon name="user-check" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleDecline(user)}
            >
              <Icon name="x" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const OutgoingRequests: React.FC<RequestsProps> = ({ requests }) => {
  const colors = useColors();
  const friendsV1 = useFriendsV1();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: "hidden",
      backgroundColor: colors("backgroundSecondary"),
    },
    icon: {
      padding: 8,
      backgroundColor: colors("backgroundTertiary"),
      borderRadius: 10000,
    },
    item: {
      flexDirection: "row",
      paddingHorizontal: 6,
      paddingVertical: 3,
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors("backgroundTertiary"),
    },
    text: {
      color: colors("textPrimary"),
    },
  });

  const handleCancel = async (id: string) => {
    const reason = await friendsV1.cancelRequest(id);

    if (reason) {
      console.log(reason);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((user) => (
        <View style={styles.item} key={user}>
          <Text style={styles.text}>{user}</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleCancel(user)}
          >
            <Icon name="x" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default AddFriends;
