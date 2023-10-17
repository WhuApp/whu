import React from 'react';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useColors } from '../hooks';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BaseLayoutProps {
  backgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
}

const BaseLayout: React.FC<React.PropsWithChildren & BaseLayoutProps> = ({
  backgroundColor,
  statusBarStyle,
  children,
}) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    root: {
      backgroundColor: backgroundColor ?? colors('backgroundPrimary'),
      height: '100%',
    },
  });

  return (
    <SafeAreaView style={styles.root}>
      <View>{children}</View>
      <StatusBar style={statusBarStyle ?? 'auto'} />
    </SafeAreaView>
  );
};

export default BaseLayout;
