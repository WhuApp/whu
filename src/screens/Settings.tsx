import React from 'react';
import {
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getStyles, Elements } from '../styles';
import { InsetView } from '../components';

const Settings: React.FC = () => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={[styles('page'), { padding: 15 }]}>
      <InsetView>
        <Text style={styles('title')}>Settings</Text>
        <Text style={styles('text')}>Current color scheme: {colorScheme}</Text>
      </InsetView>
      <StatusBar style='auto' />
    </View>
  );
};

export default Settings;
