import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  View, 
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Button from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types';

const earthImage = require('./../../assets/earth.jpg');

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.name}>
          Whu
        </Text>
        <Text style={styles.description}>
          Put some insane advertisement slogan here
        </Text>
      </View>
      <Image source={earthImage} style={styles.earth} />
      <View style={styles.footer}>
        <View style={styles.form}>
          <Button text='Sign In' onPress={() => { navigation.navigate('SignIn') }} />
          <Text style={styles.text}>
            No account yet? <Text style={styles.link}>Sign Up</Text>
          </Text>
        </View>
        <Text style={styles.copyright}>
          © 2023 Whu
        </Text>
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#0F0F31',
    padding: 15,
  },
  earth: {
    width: 400,
    height: 400,
  },
  header: {
    gap: 5,
  },
  footer: {
    alignItems: 'center',
    gap: 50,
  },
  form: {
    alignItems: 'center',
    gap: 5,
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FAFAFA',
  },
  description: {
    fontSize: 20,
    fontWeight: '300',
    color: '#D3D3D3',
  },
  copyright: {
    fontSize: 12,
    fontWeight: '300',
    color: '#D3D3D3',
  },
  text: {
    color: '#D3D3D3',
  },
  link: {
    color: '#4082E3',
    fontWeight: '500',
  },
});

export default Welcome;
