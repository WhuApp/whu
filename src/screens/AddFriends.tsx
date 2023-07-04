import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { InsetView, Button } from '../components';
import { getStyles, Elements } from '../styles';
import { useAuth } from '../components/AuthContext';

type AddFriendsProps = NativeStackScreenProps<RootStackParamList, 'AddFriends'>;

const AddFriends: React.FC<AddFriendsProps> = ({ navigation }) => {
  const { sendFriendRequest, getFriendRequests, cancelFriendRequest, declineFriendRequest} = useAuth();

  const [friendIdTextField, setFriendIdTextField] = useState<string>('');
  const [friendRequests, setFriendRequests] = useState({out: [], in: []});

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  useEffect(() => {
    getFriendRequests().then(
      (requests) => {
        setFriendRequests(requests);
        setLoading(false);
      },
      (reason) => { console.log(reason) }
    );
  }, []);

  const handleSendFriendRequest = () => {
    setLoading(true);
    sendFriendRequest(friendIdTextField).then(
      () => {
        setError(null);
        setLoading(false);
      },
      (reason) => {
        setError(reason.toString());
        setLoading(false);
      },
    );
  };
  
  const handleAcceptFriendRequest = (friendId: string) => {
    setLoading(true);
    sendFriendRequest(friendId).then(
      () => {
        setError(null);
        setLoading(false);
      },
      (reason) => {
        setError(reason.toString());
        setLoading(false);
      },
    );
  };

  const handleCancelFriendRequest = (friendId: string) => {
    setLoading(true);
    cancelFriendRequest(friendId).then(
      () => {
        setError(null);
        setLoading(false);
      },
      (reason) => {
        setError(reason.toString());
        setLoading(false);
      },
    );
  };

  const handleDeclineFriendRequest = (friendId: string) => {
    setLoading(true);
    declineFriendRequest(friendId).then(
      () => {
        setError(null);
        setLoading(false);
      },
      (reason) => {
        setError(reason.toString());
        setLoading(false);
      },
    );
  }

  return (
    <View style={[styles('page'), { paddingLeft: 15, paddingRight: 15, paddingTop: 80, paddingBottom: 80 }]}>
      <InsetView>
        <Text style={styles('title')}>Add Some Friends</Text>
        <View style={{ gap: 30 }}>
          <View>
            {friendRequests.out.map((out) => (
              <>
                <Text style={styles('text')}>{out}</Text>
                <Button text='Cancel' onPress={() => handleCancelFriendRequest(out)} />
              </>
            ))}
          </View>
          <View>
            {friendRequests.in.map((friendId) => (
              <>
                <Text style={styles('text')}>{friendId}</Text>
                <Button text='Decline' onPress={() => handleDeclineFriendRequest(friendId)} />
                <Button text='Accept' onPress={() => handleAcceptFriendRequest(friendId)} />
              </>
            ))}
          </View>
          <View style={{ gap: 10 }}>
            {error &&
              <Text style={[styles('error'), { alignSelf: 'center' }]}>
                {error}
              </Text>
            }
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Friend ID</Text>
              <TextInput style={styles('textInput')} onChangeText={setFriendIdTextField} />
            </View>
          </View>
          <Button style={{ alignSelf: 'center' }} text='Add Friend' loading={loading} onPress={handleSendFriendRequest} />
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

export default AddFriends;
