import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { Button } from '../components';
import { useColors } from '../hooks';
import { useAuth0 } from 'react-native-auth0';
import { BaseLayout } from '../layouts';

const earthImage = require('./../../assets/earth.jpg');

const Welcome: React.FC = () => {
  const { authorize } = useAuth0();

  const colors = useColors();
  const styles = StyleSheet.create({
    root: {
      height: '100%',
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
    <BaseLayout backgroundColor={'#0F0F31'} statusBarStyle={'light'}>
      <View style={styles.root}>
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
      </View>
    </BaseLayout>
  );
};

export default Welcome;
