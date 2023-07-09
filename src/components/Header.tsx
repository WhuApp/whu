import React from 'react';
import {
  View,
  useColorScheme,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from './Icon';
import { RootStackParamList } from '../types';
import { getStyles, Elements } from '../styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={[styles('container'), { flexDirection: 'row', padding: 8 }]}>
      <TouchableOpacity 
        style={styles('secondaryButton')} 
        onPress={() => navigation.navigate('Profile')}
      >
        <Icon name='user' />
      </TouchableOpacity>
      <Text style={styles('text')}>{title}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TouchableOpacity 
          style={styles('secondaryButton')} 
          onPress={() => navigation.navigate('AddFriends')}
        >
          <Icon name='user-plus' />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles('secondaryButton')} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name='settings' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
