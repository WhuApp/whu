import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import Button from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const errorByCode = new Map<string, string>([
  ['auth/missing-password', 'Missing password'],
  ['auth/invalid-email', 'Invalid E-Mail'],
  ['auth/weak-password', 'Password too weak'],
  ['auth/email-already-in-use', 'E-Mail already in use'],
  ['auth/too-many-requests', 'Too many attempts'],
]);

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('')
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const auth = getAuth();
  const [createUserWithEmailAndPassword, , , error] = useCreateUserWithEmailAndPassword(auth);

  const signUp = () => {
    createUserWithEmailAndPassword(mail, password).then((user) => {
      if (user?.user) navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.wrapper}>
      {error &&
        <Text style={styles.error}>
          {errorByCode.get(error.code) ?? 'Unknown Error'} {error.code}
        </Text>
      }
      <TextInput
        style={styles.textInput}
        placeholder='Name'
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder='E-Mail'
        onChangeText={setMail}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder='Password'
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder='Repeat Password'
        onChangeText={setRepeatPassword}
      />
      <Button
        text='Sign Up'
        onPress={signUp}
      />
      <StatusBar style='auto'/>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    height: '100%',
    gap: 10,
  },
  textInput: {
    padding: 8,
    width: '80%',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#777',
  },
  error: {
    color: '#FF3040',
  },
});

export default SignUp;
