import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useColors } from '../hooks';
import Icon from '../atoms/Icon';
import { IconButton, TextInput } from '../components';
import { BaseLayout } from '../layouts';
import { useMutation, useQuery } from 'urql';
import { graphql } from '../gql';

const FriendRequestsQuery = graphql(`
  query FriendRequestsQuery {
    incomingFriendRequests {
      id
      nickname
    }
    outgoingFriendRequests {
      id
      nickname
    }
  }
`);

const SendFriendRequest = graphql(`
  mutation SendFriendRequest($id: String!) {
    sendFriendRequest(to: $id)
  }
`);

// TODO: how to remove friends?
// TODO: remove this;;; Note for later put components inside the page component to use styles and mutations from top level component
// TODO: add search feature
const AddFriends: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [data, _refresh] = useQuery({
    query: FriendRequestsQuery,
  });
  const [fr, sendFR] = useMutation(SendFriendRequest);

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
    sendFR({ id: input });
  }

  // Loading state
  if (data.fetching) {
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
              icon={fr.fetching ? 'loader' : 'arrow-right'}
              onPress={handleAdd}
              disabled={fr.fetching}
              background={false}
            />
            <IconButton icon='camera' background={false} />
          </View>
        }
      />
      {data.data.incomingFriendRequests.length > 0 && (
        <>
          <Text style={styles.label}>Added Me</Text>
          <View style={styles.container}>
            {data.data.incomingFriendRequests.map((obj) => (
              <IncomingRequest {...obj} />
            ))}
          </View>
        </>
      )}
      {data.data.outgoingFriendRequests.length > 0 && (
        <>
          <Text style={styles.label}>Pending</Text>
          <View style={styles.container}>
            {data.data.outgoingFriendRequests.map((obj) => (
              <OutgoingRequest {...obj} />
            ))}
          </View>
        </>
      )}
    </BaseLayout>
  );
};

interface RequestProps {
  id: string;
  nickname: string;
}

// TODO: add optimistic updates (https://tanstack.com/query/v5/docs/react/guides/optimistic-updates)

const AcceptFriendRequest = graphql(`
  mutation AcceptFriendRequest($id: String!) {
    acceptFriendRequest(to: $id)
  }
`);

const IgnoreFriendRequest = graphql(`
  mutation IgnoreFriendRequest($id: String!) {
    ignoreFriendRequest(to: $id)
  }
`);

const IncomingRequest: React.FC<RequestProps> = ({ id, nickname }) => {
  const [accept, sendAccept] = useMutation(AcceptFriendRequest);
  const [ignore, sendIgnore] = useMutation(IgnoreFriendRequest);

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

  return (
    <View style={styles.item} key={id}>
      <Text style={styles.text}>{nickname}</Text>
      <View style={styles.iconWrapper}>
        <IconButton icon='user-check' onPress={() => sendAccept({ id })} background={false} />
        <IconButton icon='x' onPress={() => sendIgnore({ id })} background={false} />
      </View>
    </View>
  );
};

const CancelFriendRequest = graphql(`
  mutation CancelFriendRequest($id: String!) {
    cancelFriendRequest(to: $id)
  }
`);

const OutgoingRequest: React.FC<RequestProps> = ({ id, nickname }) => {
  const [cancel, sendCancel] = useMutation(CancelFriendRequest);

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

  return (
    <View style={styles.item} key={id}>
      <Text style={styles.text}>{nickname}</Text>
      <IconButton icon='x' onPress={() => sendCancel({ id })} background={false} />
    </View>
  );
};

export default AddFriends;
