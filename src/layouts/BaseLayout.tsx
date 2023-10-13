import React from 'react';
import { InsetView } from '../components';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { useColors } from '../hooks';
import { StyleSheet } from 'react-native';

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
    <>
      <InsetView style={styles.root}>{children}</InsetView>
      <StatusBar style={statusBarStyle ?? 'auto'} />
    </>
  );
};

export default BaseLayout;
