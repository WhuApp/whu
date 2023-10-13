import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { IconButton, InsetView } from '../components';
import { useColors } from '../hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
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
    <>
      <InsetView style={styles.root}>
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
        <View style={styles.content}>{children}</View>
      </InsetView>
      <StatusBar style='auto' />
    </>
  );
};

export default MainLayout;
