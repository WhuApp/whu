import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable } from 'react-native';
import { Button, InsetView } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types';
import { getStyles, Elements } from '../styles';

const earthImage = require('./../../assets/earth.jpg');

type WelcomeProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const styles = (element: keyof Elements) => getStyles(element, 'dark');

  return (
    <View style={{ padding: 15, backgroundColor: '#0F0F31' }}>
      <InsetView style={styles('container')}>
        <View style={{ gap: 5 }}>
          <Text style={styles('title')}>Whu</Text>
          <Text style={{ fontSize: 20, fontWeight: '300', color: '#D3D3D3' }}>
            Put some insane advertisement slogan here
          </Text>
        </View>
        <Image source={earthImage} style={{ width: 400, height: 400 }} />
        <View style={{ alignItems: 'center', gap: 50 }}>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <Button title='Sign In' onPress={() => navigation.navigate('SignIn')} />
            <View style={{ flexDirection: 'row', gap: 3 }}>
              <Text style={styles('text')}>No account yet?</Text>
              <Pressable onPress={() => { navigation.navigate('SignUp') }}>
                <Text style={styles('link')}>Sign Up</Text>
              </Pressable>
            </View>
          </View>
          <Text style={{ fontSize: 12, fontWeight: '300', color: '#D3D3D3' }}>
            © 2023 Whu
          </Text>
        </View>
        <StatusBar style='light' />
      </InsetView>
    </View>
  );
};

export default Welcome;
