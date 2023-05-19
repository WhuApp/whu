import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
    logInWithEmailAndPassword,
} from '../firebase'
import Button from '../components/Button';

const SignIn: React.FC = () => {
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const signIn = () => {
    logInWithEmailAndPassword(mail, password)
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.textInput}
        placeholder='E-Mail'
        onChangeText={(text) => setMail(text)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        placeholder='Password'
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        text='Sign In'
        onPress={signIn}
      />
      <StatusBar style='auto' />
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
