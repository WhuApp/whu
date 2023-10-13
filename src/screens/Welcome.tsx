import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, InsetView } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useColors } from '../hooks';
import { useAuth0 } from 'react-native-auth0';

const earthImage = require('./../../assets/earth.jpg');

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const { authorize } = useAuth0();

  const colors = useColors();
  const styles = StyleSheet.create({
    root: {
      backgroundColor: '#0F0F31',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    title: {
      color: colors('textPrimary', 'dark'),
      fontSize: 40,
      fontWeight: 'bold',
    },
    image: {
      width: 350,
      height: 350,
    },
    container: {
      alignItems: 'center',
      gap: 8,
    },
    wrapper: {
      flexDirection: 'row',
      gap: 4,
    },
    text: {
      color: colors('textSecondary', 'dark'),
    },
    link: {
      color: colors('linkText'),
      fontWeight: 'bold',
    },
  });

  function handleSignIn() {
    authorize({}, {}).catch((e) => Alert.alert(e));
  }

  return (
    <>
      <InsetView style={styles.root}>
        <Text style={styles.title}>Whu</Text>
        <Image style={styles.image} source={earthImage} />
        <View style={styles.container}>
          <Button title='Sign In' onPress={handleSignIn} />
          <View style={styles.wrapper}>
            <Text style={styles.text}>No account yet?</Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </InsetView>
      <StatusBar style='light' />
    </>
  );
};

export default Welcome;
