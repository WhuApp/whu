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
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { InsetView, Button } from '../components';
import { getStyles, Elements } from '../styles';

const errorByCode = new Map<string, string>([
  ['auth/missing-password', 'Missing password'],
  ['auth/wrong-password', 'Wrong password'],
  ['auth/user-not-found', 'User not found'],
  ['auth/invalid-email', 'Invalid E-Mail'],
  ['auth/too-many-requests', 'Too many attempts'],
]);

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(getAuth());

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const signIn = () => {
    signInWithEmailAndPassword(mail, password).then((user) => {
      if (user?.user) navigation.navigate('Home');
    });
  };

  return (
    <View style={[ styles('page'), { paddingLeft: 15, paddingRight: 15, paddingTop: 80, paddingBottom: 80 } ]}>
      <InsetView style={styles('container')}>
        <Text style={styles('title')}>Sign in to Whu</Text>
        <View style={{ gap: 30 }}>
          <View style={{ gap: 10 }}>
            {error &&
              <Text style={[ styles('error'), { alignSelf: 'center' } ]}>
                {errorByCode.get(error.code) ?? 'Unknown Error'}
              </Text>
            }
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>E-Mail</Text>
              <TextInput style={styles('textInput')} onChangeText={setMail} />
            </View>
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Password</Text>
              <TextInput style={styles('textInput')} secureTextEntry onChangeText={setPassword} />
            </View>
            <Text style={styles('link')}>Forgot password?</Text>
          </View>
          <Button style={{ alignSelf: 'center' }} text='Sign In' loading={loading} onPress={signIn} />
        </View>
        <Text style={styles('text')}>
          No account yet?
          <Pressable onPress={() => { navigation.navigate('SignUp') }}>
            <Text style={styles('link')}>Sign Up</Text>
          </Pressable>
        </Text>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

export default SignIn;
