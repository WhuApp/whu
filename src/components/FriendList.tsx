import React from 'react';
import { useList } from 'react-firebase-hooks/database'
import { ref, getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStyles, Elements } from '../styles';
import { 
  ActivityIndicator, 
  Text, 
  View, 
  ViewProps, 
  useColorScheme 
} from 'react-native';

interface FriendListProps {
  uid: string;
};

const FriendList: React.FC<FriendListProps & ViewProps> = ({ uid, style, ...props }) => {
  const auth = getAuth();
  const [friends, loading, ] = useList(ref(
    getDatabase(auth.app, "https://whuapp-bce7b-default-rtdb.europe-west1.firebasedatabase.app/"), 
    `users/${uid}/friends`
  ));

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  if (loading) return <ActivityIndicator size={'large'} /> // TODO color this
  if (friends.length == 0) return <Text style={styles('text')}>You dont have any friends</Text>

  return (
    <View style={[ style, styles('container') ]} {...props}>
      {friends.map((value, index) => (
        <Text style={styles('text')} key={index}>{value.val()}</Text>
      ))}
    </View>
  );
};

export default FriendList;
