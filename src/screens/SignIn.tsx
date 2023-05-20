import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
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

const errorByCode = new Map<string, string>([
  ['auth/missing-password', 'Missing password'],
  ['auth/wrong-password', 'Wrong password'],
  ['auth/user-not-found', 'User not found'],
  ['auth/invalid-email', 'Invalid E-Mail'],
  ['auth/too-many-requests', 'Too many attempts'],
]);

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const auth = getAuth();
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);

  const isDarkMode = useColorScheme() === 'dark';

  const signIn = () => {
    signInWithEmailAndPassword(mail, password).then((user) => {
      if (user?.user) navigation.navigate('Home');
    });
  };

  return (
    <View style={isDarkMode ? darkStyles.wrapper : lightStyles.wrapper}>
      <InsetView style={styles.container}>
        <Text style={isDarkMode ? darkStyles.title : lightStyles.title}>
          Sign in to Whu
        </Text>
        <View style={styles.form}>
          <View style={styles.inputs}>
            {error &&
              <Text style={styles.error}>
                {errorByCode.get(error.code) ?? 'Unknown Error'}
              </Text>
            }
            <View style={styles.inputWrapper}>
              <Text style={isDarkMode ? darkStyles.label : lightStyles.label}>
                E-Mail
              </Text>
              <TextInput
                style={isDarkMode ? darkStyles.textInput : lightStyles.textInput}
                onChangeText={setMail}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={isDarkMode ? darkStyles.label : lightStyles.label}>
                Password
              </Text>
              <TextInput
                style={isDarkMode ? darkStyles.textInput : lightStyles.textInput}
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>
            <Text style={styles.link}>
              Forgot password?
            </Text>
          </View>
          <Button
            style={styles.button}
            text='Sign In'
            onPress={signIn}
          />
        </View>
        <Text style={isDarkMode ? darkStyles.text : lightStyles.text}>
          No account yet?
          <Pressable onPress={() => { navigation.navigate('SignUp') }}>
            <Text style={styles.link}>Sign Up</Text>
          </Pressable>
        </Text>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 80,
    paddingBottom: 80,
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
  },
  inputs: {
    gap: 10,
  },
  form: {
    gap: 30,
  },
  inputWrapper: {
    gap: 5,
  },
  textInput: {
    padding: 8,
    width: 350,
    borderRadius: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  button: {
    alignSelf: 'center',
  },
  error: {
    color: '#FF3040',
    alignSelf: 'center',
  },
  link: {
    color: '#4082E3',
    fontWeight: '500',
  },
});

const darkStyles = StyleSheet.create({
  wrapper: StyleSheet.flatten([styles.wrapper, {
    backgroundColor: '#313338',
  }]),
  title: StyleSheet.flatten([styles.title, {
    color: '#FFFFFF',
  }]),
  textInput: StyleSheet.flatten([styles.textInput, {
    backgroundColor: '#1e1f22',
    color: '#FFFFFF',
  }]),
  label: StyleSheet.flatten([styles.label, {
    color: '#b5bac1',
  }]),
  text: {
    color: '#D3D3D3',
  },
});

const lightStyles = StyleSheet.create({
  wrapper: StyleSheet.flatten([styles.wrapper, {
    backgroundColor: '#F2F2F2',
  }]),
  title: StyleSheet.flatten([styles.title, {
    color: '#000000',
  }]),
  textInput: StyleSheet.flatten([styles.textInput, {
    backgroundColor: '#ffffff',
    color: '#000000',
  }]),
  label: StyleSheet.flatten([styles.label, {
    color: '#141414',
  }]),
  text: {
    color: '#222222',
  },
});

export default SignIn;
