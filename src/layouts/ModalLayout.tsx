import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Icon, InsetView } from '../components';
import { useColors } from '../hooks';
import { RootStackParamList } from '../types';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface ModalLayoutProps {
  title: string;
  onPressMore: () => void;
}

const ModalLayout: React.FC<React.PropsWithChildren & ModalLayoutProps> = ({
  title,
  onPressMore,
  children,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const colors = useColors();

  const rootStyle: ViewStyle = {
    backgroundColor: colors('backgroundSecondary'),
  };
  const headerStyle: ViewStyle = {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const titleStyle: TextStyle = {
    color: colors('textPrimary'),
    fontSize: 20,
    fontWeight: 'normal',
  };
  const contentStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    padding: 15,
    gap: 10,
    backgroundColor: colors('backgroundPrimary'),
  };

  return (
    <>
      <InsetView style={rootStyle}>
        <View style={headerStyle}>
          <Pressable onPress={navigation.goBack}>
            <Icon name='chevron-down' />
          </Pressable>
          <Text style={titleStyle}>{title}</Text>
          <Pressable onPress={onPressMore}>
            <Icon name='more-horizontal' />
          </Pressable>
        </View>
        <View style={contentStyle}>{children}</View>
      </InsetView>
      <StatusBar style='auto' />
    </>
  );
};

export default ModalLayout;
