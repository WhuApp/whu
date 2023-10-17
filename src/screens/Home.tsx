import React from 'react';
import { FriendList, IconButton } from '../components';
import { BaseLayout } from '../layouts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useColors } from '../hooks';
import { StyleSheet, View } from 'react-native';

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useColors();

  const styles = StyleSheet.create({
    root: {
      backgroundColor: colors('backgroundSecondary'),
    },
    header: {
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    wrapper: {
      gap: 8,
      flexDirection: 'row',
    },
    content: {
      width: '100%',
      height: '100%',
      padding: 15,
      gap: 10,
      backgroundColor: colors('backgroundPrimary'),
    },
  });

  return (
    <BaseLayout backgroundColor={colors('backgroundSecondary')}>
      <View style={styles.header}>
        <View style={styles.wrapper}>
          <IconButton icon='user' onPress={() => navigation.navigate('Profile')} />
          <IconButton icon='award' disabled />
        </View>
        <View style={styles.wrapper}>
          <IconButton icon='user-plus' onPress={() => navigation.navigate('AddFriends')} />
          {__DEV__ && <IconButton icon='code' onPress={() => navigation.navigate('DevPage')} />}
          <IconButton icon='settings' onPress={() => navigation.navigate('Settings')} />
        </View>
      </View>
      <View style={styles.content}>
        <FriendList />
      </View>
    </BaseLayout>
  );
};

export default Home;
