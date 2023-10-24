import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useColors } from '../hooks';
import Icon from '../atoms/Icon';
import { IconButton, TextInput } from '../components';
import { BaseLayout } from '../layouts';
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  sendFriendRequest,
} from '../api/friends';
import { getUserById } from '../api/users';

// TODO: how to remove friends?
// TODO: remove this;;; Note for later put components inside the page component to use styles and mutations from top level component
const AddFriends: React.FC = () => {
  const [input, setInput] = useState<string>('');

  const { data: incoming, isPending: incomingPending } = getIncomingFriendRequests();
  const { data: outgoing, isPending: outgoingPending } = getOutgoingFriendRequests();
  const { mutate: sendRequest, isPending: sendRequestPending } = sendFriendRequest();

  const colors = useColors();
  const styles = StyleSheet.create({
    iconWrapper: {
      flexDirection: 'row',
      gap: 8,
    },
    label: {
      color: colors('textSecondary'),
    },
    container: {
      borderRadius: 15,
      overflow: 'hidden',
      backgroundColor: colors('backgroundSecondary'),
    },
  });

  function handleAdd() {
    sendRequest(input);
  }

  if (incomingPending || outgoingPending) {
    return <ActivityIndicator />;
  }

  return (
    <BaseLayout>
      <TextInput
        placeholder='Search..'
        onChangeText={setInput}
        prefix={<Icon name='search' />}
        suffix={
          <View style={styles.iconWrapper}>
            <IconButton
              icon={sendRequestPending ? 'loader' : 'arrow-right'}
              onPress={handleAdd}
              disabled={sendRequestPending}
              background={false}
            />
            <IconButton icon='camera' background={false} />
          </View>
        }
      />
      {incoming.length > 0 && (
        <>
          <Text style={styles.label}>Added Me</Text>
          <View style={styles.container}>
            {incoming.map((id) => (
              <IncomingRequest id={id} />
            ))}
          </View>
        </>
      )}
      {outgoing.length > 0 && (
        <>
          <Text style={styles.label}>Pending</Text>
          <View style={styles.container}>
            {outgoing.map((id) => (
              <OutgoingRequest id={id} />
            ))}
          </View>
        </>
      )}
    </BaseLayout>
  );
};

interface RequestProps {
  id: string;
}

// TODO: add optimistic updates (https://tanstack.com/query/v5/docs/react/guides/optimistic-updates)

const IncomingRequest: React.FC<RequestProps> = ({ id }) => {
  const { data, isPending } = getUserById(id);
  const { mutate: acceptRequest } = acceptFriendRequest();
  const { mutate: declineRequest } = declineFriendRequest();

  const colors = useColors();
  const styles = StyleSheet.create({
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

  if (isPending) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.item} key={id}>
      <Text style={styles.text}>{data.nickname}</Text>
      <View style={styles.iconWrapper}>
        <IconButton icon='user-check' onPress={() => acceptRequest(id)} background={false} />
        <IconButton icon='x' onPress={() => declineRequest(id)} background={false} />
      </View>
    </View>
  );
};

const OutgoingRequest: React.FC<RequestProps> = ({ id }) => {
  const { data, isPending } = getUserById(id);
  const { mutate: cancelRequest } = cancelFriendRequest();

  const colors = useColors();
  const styles = StyleSheet.create({
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

  if (isPending) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.item} key={id}>
      <Text style={styles.text}>{data.nickname}</Text>
      <IconButton icon='x' onPress={() => cancelRequest(id)} background={false} />
    </View>
  );
};

export default AddFriends;
