import React from 'react';
import { InsetView } from '../components';
import { StatusBar } from 'expo-status-bar';
import { useColors } from '../hooks';
import { StyleSheet } from 'react-native';

interface BaseLayoutProps {
  backgroundColor?: string;
}

const BaseLayout: React.FC<React.PropsWithChildren & BaseLayoutProps> = ({
  backgroundColor,
  children,
}) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    root: {
      backgroundColor: backgroundColor ?? colors('backgroundPrimary'),
      padding: 15,
    },
  });

  return (
    <>
      <InsetView style={styles.root}>{children}</InsetView>
      <StatusBar style='auto' />
    </>
  );
};

export default BaseLayout;
