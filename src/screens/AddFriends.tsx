import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  useColorScheme,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { InsetView, Button, Icon } from '../components';
import { getStyles, Elements, colors } from '../styles';
import { removeFriend, getFriendRequests } from '../services/friends';
import { addFriend } from '../services/friends';
import type { PendingRequests } from '../types';

const AddFriends: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [requests, setRequests] = useState<PendingRequests | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  useEffect(() => {
    setLoading(false);

    getFriendRequests().then(
      (requests) => {
        setRequests(requests);
        setLoading(false);
      },
      (reason) => {
        console.log(reason);
        setLoading(false);
      },
    );
  }, []);

  const handleAdd = async () => {
    setLoading(true);

    const reason = await addFriend(input);

    if (reason) Alert.alert('Error', reason);
    setLoading(false);
  };

  return (
    <View style={[styles('page'), { padding: 15 }]}>
      <InsetView style={{ gap: 10 }}>
        <Text style={styles('title')}>Add Friends</Text>
        <View style={{ gap: 5 }}>
          <Text style={styles('label')}>Pending</Text>
          {requests ? (
            <OutgoingRequests requests={requests.outgoing} />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles('label')}>Added Me</Text>
          {requests ? (
            <IncomingRequests requests={requests.incoming} />
          ) : (
            <ActivityIndicator />
          )}
        </View>
        <View style={styles('inputWrapper')}>
          <Text style={styles('label')}>Search</Text>
          <TextInput 
            style={styles('textInput')} 
            placeholder='Friend ID..' 
            placeholderTextColor={colorScheme == 'light' ? colors.lightTextTertiary : colors.darkTextTertiary}
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
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const handleAccept = (id: string) =>
    addFriend(id).catch((reason) => console.log(reason));

  const handleDecline = async (id: string) => {
    const reason = await removeFriend(id);

    if (reason) Alert.alert('Error', reason);
  };

  if (!requests.length) return <Text style={styles('text')}>No incoming requests!</Text>;

  return (
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
      {requests.map((user) => (
        <View style={styles('listItem')} key={user}>
          <Text style={styles('text')}>{user}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              style={styles('secondaryButton')}
              onPress={() => handleAccept(user)}
            >
              <Icon name='user-check' size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles('secondaryButton')}
              onPress={() => handleDecline(user)}
            >
              <Icon name='x' size={20} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const OutgoingRequests: React.FC<{ requests: string[] }> = ({ requests }) => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const handleCancel = async (id: string) => {
    const reason = await removeFriend(id);

    if (reason) Alert.alert('Error', reason);
  };

  if (!requests.length) return <Text style={styles('text')}>No outgoing requests!</Text>;

  return (
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
      {requests.map((user) => (
        <View style={styles('listItem')} key={user}>
          <Text style={styles('text')}>{user}</Text>
          <TouchableOpacity onPress={() => handleCancel(user)}>
            <Icon name='x' size={20} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default AddFriends;
