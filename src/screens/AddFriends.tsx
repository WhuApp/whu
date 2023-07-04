import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
  const { sendFriendRequest } = useAuth();

  const [friendId, setFriendId] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(null);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const handleAddFriends = () => {
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

  return (
    <View style={[styles('page'), { paddingLeft: 15, paddingRight: 15, paddingTop: 80, paddingBottom: 80 }]}>
      <InsetView style={styles('container')}>
        <Text style={styles('title')}>Sign in to Whu</Text>
        <View style={{ gap: 30 }}>
          <View style={{ gap: 10 }}>
            {error &&
              <Text style={[styles('error'), { alignSelf: 'center' }]}>
                {error}
              </Text>
            }
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Friend ID</Text>
              <TextInput style={styles('textInput')} onChangeText={setFriendId} />
            </View>
          </View>
          <Button style={{ alignSelf: 'center' }} text='Add Friend' loading={loading} onPress={handleAddFriends} />
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

export default AddFriends;
