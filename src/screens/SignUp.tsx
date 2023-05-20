import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  useColorScheme,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import {
  useCreateUserWithEmailAndPassword, useDeleteUser,
  useUpdateProfile
} from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { InsetView, Button } from '../components';
import { getStyles, Elements } from '../styles';

const errorByCode = new Map<string, string>([
  ['auth/missing-password', 'Missing password'],
  ['auth/invalid-email', 'Invalid E-Mail'],
  ['auth/weak-password', 'Password too weak'],
  ['auth/email-already-in-use', 'E-Mail already in use'],
  ['auth/too-many-requests', 'Too many attempts'],
]);

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [createUserWithEmailAndPassword, , loading, createUserError] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
  const [errorMessage, setError] = useState<string>();

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const signUp = () => {
    if(password != repeatPassword)
    {
      setError('Passwords do not match');
      return
    }
    if(!name.match("^[A-Za-z][A-Za-z0-9_]{2,29}$"))
    {
      setError('Name is invalid');
      return
    }
    createUserWithEmailAndPassword(mail, password).then((user) => {
      if (user?.user) {
        updateProfile({ displayName: name }).then(() => {
          if (updateProfileError)
            useDeleteUser(auth);
          navigation.navigate('Home');
        })
      }
    });
    if (createUserError || updateProfileError)
      setError(errorByCode.get(createUserError.code) ?? 'Unknown Firebase Error');
    else
      setError(undefined);
  };

  return (
    <View style={[ styles('page'), { paddingLeft: 15, paddingRight: 15, paddingTop: 80, paddingBottom: 80 } ]}>
      <InsetView style={styles('container')}>
        <Text style={styles('title')}>
          Sign up for Whu
        </Text>
        <View style={{ gap: 30 }}>
          <View style={{ gap: 10 }}>
            {
              errorMessage !== undefined &&
              <Text style={[ styles('error'), { alignSelf: 'center' } ]}>
                {errorMessage}
              </Text>
            }
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Name</Text>
              <TextInput style={styles('textInput')} onChangeText={setName} />
            </View>
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>E-Mail</Text>
              <TextInput style={styles('textInput')} onChangeText={setMail} />
            </View>
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Password</Text>
              <TextInput style={styles('textInput')} secureTextEntry onChangeText={setPassword} />
            </View>
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Repeat Password</Text>
              <TextInput style={styles('textInput')} secureTextEntry onChangeText={setRepeatPassword} />
            </View>
          </View>
          <Button style={{ alignSelf: 'center' }} text='Sign Up' loading={loading} onPress={signUp} />
        </View>
        <View style={{ flexDirection: 'row', gap: 3 }}>
          <Text style={styles('text')}>Already have an account?</Text>
          <Pressable onPress={() => { navigation.navigate('SignIn') }}>
            <Text style={styles('link')}>Sign in</Text>
          </Pressable>
        </View>
      </InsetView>
      <StatusBar style='auto'/>
    </View>
  );
};

export default SignUp;
