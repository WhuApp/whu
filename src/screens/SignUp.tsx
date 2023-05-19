import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import Button from '../components/Button';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>

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
      <Text>
        {error?.message}
      </Text>
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

export default SignUp;
