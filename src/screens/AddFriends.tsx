import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { InsetView, Button } from '../components';
import { getStyles, Elements } from '../styles';
import { useAuth } from '../components/AuthContext';

type PendingRequests = {
  outgoing: string[];
  incoming: string[];
};

const AddFriends: React.FC = () => {
  const { sendFriendRequest, getFriendRequests } = useAuth();
  const [input, setInput] = useState<string>('');
  const [requests, setRequests] = useState<PendingRequests | undefined>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  useEffect(() => {
    getFriendRequests().then(
      (requests) => setRequests(requests),
      (reason) => console.log(reason)
    );
  }, []);

  const handleAdd = () => {
    setLoading(true);

    sendFriendRequest(input).then(
      () => {
        setRequests((old) => ({ incoming: old.incoming, outgoing: [input, ...old.outgoing] }));
        setLoading(false);
      },
      (reason) => {
        console.log(reason);
        setLoading(false);
      },
    );
  };

  return (
    <View style={[styles('page'), { padding: 15 }]}>
      <InsetView>
        <Text style={styles('title')}>Add Friends</Text>
        <Text style={styles('label')}>Pending</Text>
        {requests ? <OutgoingRequests requests={requests.outgoing ?? []} /> : <ActivityIndicator />}
        <Text style={styles('label')}>Added Me</Text>
        {requests ? <IncomingRequests requests={requests.incoming ?? []} /> : <ActivityIndicator />}
        <View style={styles('inputWrapper')}>
          <Text style={styles('label')}>Friend ID</Text>
          <TextInput 
            style={styles('textInput')} 
            onChangeText={setInput} 
          />
        </View>
        <Button
          loading={loading}
          text='Add Friend'
          onPress={handleAdd}
        />
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

const IncomingRequests: React.FC<{ requests: string[] }> = ({ requests }) => {
  const { sendFriendRequest, declineFriendRequest } = useAuth();
  const [users, setUsers] = useState<string[]>(requests);

  const handleAccept = (id: string) => {
    sendFriendRequest(id).then(
      () => setUsers(users.filter((user) => user !== id)),
      (reason) => console.log(reason)
    );
  };

  const handleDecline = (id: string) => {
    declineFriendRequest(id).then(
      () => setUsers(users.filter((user) => user !== id)),
      (reason) => console.log(reason)
    );
  };

  if (!users.length) return (<Text>No incoming requests!</Text>);

  return (
    <View>
      {users.map((user) => (
        <View key={user}>
          <Text>{user}</Text>
          <View>
            <Button text='Accept' onPress={() => handleAccept(user)} />
            <Button text='Decline' onPress={() => handleDecline(user)} />
          </View>
        </View>
      ))}
    </View>
  );
};

const OutgoingRequests: React.FC<{ requests: string[] }> = ({ requests }) => {
  const { cancelFriendRequest } = useAuth();
  const [users, setUsers] = useState<string[]>(requests);

  const handleCancel = (id: string) => {
    cancelFriendRequest(id).then(
      () => setUsers(users.filter((user) => user !== id)),
      (reason) => console.log(reason)
    );
  };

  if (!users.length) return (<Text>No outgoing requests!</Text>);

  return (
    <View>
      {users.map((user) => (
        <View key={user}>
          <Text>{user}</Text>
          <Button text='Cancel' onPress={() => handleCancel(user)} />
        </View>
      ))}
    </View>
  );
};

export default AddFriends;
