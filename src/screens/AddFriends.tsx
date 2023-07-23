import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, Icon } from '../components';
import { removeFriend, getFriendRequests } from '../services/friends';
import { addFriend } from '../services/friends';
import type { PendingRequests } from '../types';
import { useColors } from '../utils';
import ModalLayout from '../layouts/ModalLayout';

interface RequestsProps {
  requests: string[];
}

const AddFriends: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [requests, setRequests] = useState<PendingRequests>({ incoming: [], outgoing: [] });
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
      const data = await getFriendRequests();
      setRequests(data);
    })();
  }, []);

  const handleAdd = async () => {
    const reason = await addFriend(input);

    if (reason) {
      Alert.alert('Error', reason);
    }
  };

  return (
    <ModalLayout
      title='Add Friends'
      onPressMore={() => { }}
    >
      <TextInput
        placeholder='Search..'
        onChangeText={setInput}
        contentLeft={
          <Icon name='search' />
        }
        contentRight={
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={handleAdd}>
              <Icon name='arrow-right' />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name='camera' />
            </TouchableOpacity>
          </View>
        }
      />
      {requests.incoming.length > 0 && (
        <>
          <Text style={styles.label}>
            Added Me
          </Text>
          <IncomingRequests requests={requests.incoming} />
        </>
      )}
      {requests.outgoing.length > 0 && (
        <>
          <Text style={styles.label}>
            Pending
          </Text>
          <OutgoingRequests requests={requests.outgoing} />
        </>
      )}
    </ModalLayout>
  )
};

const IncomingRequests: React.FC<RequestsProps> = ({ requests }) => {
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      backgroundColor: colors('backgroundSecondary'),
    },
    icon: {
      padding: 8,
      backgroundColor: colors('backgroundTertiary'),
      borderRadius: 10000,
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
    const reason = await addFriend(id);

    if (reason) {
      console.log(reason);
    }
  };

  const handleDecline = async (id: string) => {
    const reason = await removeFriend(id);

    if (reason) {
      console.log(reason);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((user) => (
        <View style={styles.item} key={user}>
          <Text style={styles.text}>
            {user}
          </Text>
          <View style={styles.iconWrapper}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleAccept(user)}
            >
              <Icon name='user-check' />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => handleDecline(user)}
            >
              <Icon name='x' />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const OutgoingRequests: React.FC<RequestsProps> = ({ requests }) => {
  const colors = useColors();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      backgroundColor: colors('backgroundSecondary'),
    },
    icon: {
      padding: 8,
      backgroundColor: colors('backgroundTertiary'),
      borderRadius: 10000,
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
    const reason = await removeFriend(id);

    if (reason) {
      console.log(reason);
    }
  };

  return (
    <View style={styles.container}>
      {requests.map((user) => (
        <View style={styles.item} key={user}>
          <Text style={styles.text}>
            {user}
          </Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleCancel(user)}
          >
            <Icon name='x' />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default AddFriends;
