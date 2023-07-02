import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TextInput, View, Text, useColorScheme, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { InsetView, Button } from '../components';
import { getStyles, Elements } from '../styles';
import { useAuth } from '../components/AuthContext';

type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const { signUp } = useAuth();

  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  const handleSignUp = () => {
    setLoading(true);

    if (password != repeatPassword) {
      setErrorMessage('Passwords do not match');
      setLoading(false);

      return;
    }

    signUp(name, mail, password).then(
      () => {
        setErrorMessage(null);
        setLoading(false);
      },
      (reason) => {
        setErrorMessage(reason.toString());
        setLoading(false);
      },
    );
  };

  return (
    <View
      style={[
        styles('page'),
        {
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 80,
          paddingBottom: 80,
        },
      ]}
    >
      <InsetView style={styles('container')}>
        <Text style={styles('title')}>Sign up for Whu</Text>
        <View style={{ gap: 30 }}>
          <View style={{ gap: 10 }}>
            {errorMessage && (
              <Text style={[styles('error'), { alignSelf: 'center' }]}>
                {errorMessage}
              </Text>
            )}
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
              <TextInput
                style={styles('textInput')}
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>
            <View style={styles('inputWrapper')}>
              <Text style={styles('label')}>Repeat Password</Text>
              <TextInput
                style={styles('textInput')}
                secureTextEntry
                onChangeText={setRepeatPassword}
              />
            </View>
          </View>
          <Button
            style={{ alignSelf: 'center' }}
            text='Sign Up'
            loading={loading}
            onPress={handleSignUp}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 3 }}>
          <Text style={styles('text')}>Already have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <Text style={styles('link')}>Sign in</Text>
          </Pressable>
        </View>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

export default SignUp;
