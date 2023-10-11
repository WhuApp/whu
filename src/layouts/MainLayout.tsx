import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, InsetView } from '../components';
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
    button: {
      padding: 8,
      backgroundColor: colors('backgroundTertiary'),
      borderRadius: 10000,
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
            <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
              <Icon name='user' />
            </Pressable>
            <Pressable style={styles.button} onPress={() => {}}>
              <Icon name='award' />
            </Pressable>
          </View>
          <View style={styles.wrapper}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('AddFriends')}>
              <Icon name='user-plus' />
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Settings')}>
              <Icon name='settings' />
            </Pressable>
            {__DEV__ && (
              <Pressable style={styles.button} onPress={() => navigation.navigate('DevPage')}>
                <Icon name='code' />
              </Pressable>
            )}
          </View>
        </View>
        <View style={styles.content}>{children}</View>
      </InsetView>
      <StatusBar style='auto' />
    </>
  );
};

export default MainLayout;
