import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import ModalLayout from '../layouts/ModalLayout';
import useFriendsV1 from '../services/friends_v1';
import useUsersV1 from '../services/users_v1';
import { useColors } from '../hooks';
import Icon from '../atoms/Icon';
import { IconButton, TextInput } from '../components';

interface RequestsProps {
  requests: string[];
}

const AddFriends: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [incoming, setIncoming] = useState<string[]>([]);
  const [outgoing, setOutgoing] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const friendsService = useFriendsV1();
  const usersService = useUsersV1();

  const colors = useColors();
  const styles = StyleSheet.create({
    iconWrapper: {
      flexDirection: 'row',
      gap: 8,
    },
    label: {
      color: colors('textSecondary'),
    },
  });

  useEffect(() => {
    (async () => {
      const dataIn = await friendsService.getIncomingFriendRequests();
      const dataOut = await friendsService.getOutgoingFriendRequests();

      setIncoming(dataIn);
      setOutgoing(dataOut);
    })();
  }, [friendsService]);

  const handleAdd = async () => {
    if (isAdding) return;

    setIsAdding(true);

    try {
      const ids = await usersService.findUserByNickname(input);

      if (ids.length > 1) {
        Alert.alert('Error', 'Too many users?!');
      } else if (ids.length == 0) {
        Alert.alert('Error', 'Could not find user!');
      } else {
        const reason = await friendsService.sendFriendRequestTo(ids[0]);

        if (reason) {
          Alert.alert('Error', reason);
        }
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <ModalLayout title='Add Friends' onPressMore={() => {}}>
      <TextInput
        placeholder='Search..'
        onChangeText={setInput}
        prefix={<Icon name='search' />}
        suffix={
          <View style={styles.iconWrapper}>
            <IconButton
              icon={isAdding ? 'loader' : 'arrow-right'}
              onPress={handleAdd}
              disabled={isAdding}
              background={false}
            />
            <IconButton icon='camera' background={false} />
          </View>
        }
      />
      {incoming.length > 0 && (
        <>
          <Text style={styles.label}>Added Me</Text>
          <IncomingRequests requests={incoming} />
        </>
      )}
      {outgoing.length > 0 && (
        <>
          <Text style={styles.label}>Pending</Text>
          <OutgoingRequests requests={outgoing} />
        </>
      )}
    </ModalLayout>
  );
};

const IncomingRequests: React.FC<RequestsProps> = ({ requests }) => {
  const friendsService = useFriendsV1();

  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      backgroundColor: colors('backgroundSecondary'),
    },
    item: {
      flexDirection: 'row',
      paddingHorizontal: 6,
      paddingVertical: 3,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors('backgroundTertiary'),
    },
    text: {
      color: colors('textPrimary'),
    },
    iconWrapper: {
      flexDirection: 'row',
      gap: 8,
    },
  });

  const handleAccept = async (id: string) => {
    const reason = await friendsService.acceptRequest(id);

    if (reason) {
      Alert.alert(reason);
    }
  };

  const handleDecline = async (id: string) => {
    const reason = await friendsService.declineRequest(id);

    if (reason) {
      Alert.alert(reason);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((user) => (
        <View style={styles.item} key={user}>
          <Text style={styles.text}>{user}</Text>
          <View style={styles.iconWrapper}>
            <IconButton icon='user-check' onPress={() => handleAccept(user)} background={false} />
            <IconButton icon='x' onPress={() => handleDecline(user)} background={false} />
          </View>
        </View>
      ))}
    </View>
  );
};

const OutgoingRequests: React.FC<RequestsProps> = ({ requests }) => {
  const friendsService = useFriendsV1();

  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      backgroundColor: colors('backgroundSecondary'),
    },
    item: {
      flexDirection: 'row',
      paddingHorizontal: 6,
      paddingVertical: 3,
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors('backgroundTertiary'),
    },
    text: {
      color: colors('textPrimary'),
    },
  });

  const handleCancel = async (id: string) => {
    const reason = await friendsService.cancelRequest(id);

    if (reason) {
      Alert.alert(reason);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((user) => (
        <View style={styles.item} key={user}>
          <Text style={styles.text}>{user}</Text>
          <IconButton icon='x' onPress={() => handleCancel(user)} background={false} />
        </View>
      ))}
    </View>
  );
};

export default AddFriends;
