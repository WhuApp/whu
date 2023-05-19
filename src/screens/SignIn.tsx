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
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const auth = getAuth();
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(auth);

  const signIn = () => {
    signInWithEmailAndPassword(mail, password).then((user) => {
      if (user?.user) navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.wrapper}>
      <Text>
        {error?.message}
      </Text>
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
      <Button
        text='Sign In'
        onPress={signIn}
      />
      <StatusBar style='auto'/>
    </View>
  )
}

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
});

export default SignIn;
