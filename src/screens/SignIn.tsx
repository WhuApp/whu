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
import { createSession } from '../appwrite';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const signIn = () => {
    setLoading(true);

    createSession(mail, password)
      .then(
        (response) => {
          console.log(response);

          setError(undefined);
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
        <View style={{ flexDirection: 'row', gap: 3 }}>
          <Text style={styles('text')}>No account yet?</Text>
          <Pressable onPress={() => { navigation.navigate('SignUp') }}>
            <Text style={styles('link')}>Sign Up</Text>
          </Pressable>
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

export default SignIn;
