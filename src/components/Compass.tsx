import React from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { getStyles, Elements, colors } from '../styles';
import Icon from './Icon';

interface CompassProps {
  direction: number;
};

const Compass: React.FC<CompassProps> = ({ direction }) => {
  const colorScheme = useColorScheme();
  const styles = (element: keyof Elements) => getStyles(element, colorScheme);

  return (
    <View style={{ borderRadius: 10000, backgroundColor: colorScheme === 'dark' ? colors.darkBackgroundTertiary : colors.lightBackgroundTertiary }}>
      <View style={{ transform: [{ rotate: `${direction}deg` }] }}>
        <Icon name='arrow-up' />
      </View>
    </View>
  );
};

export default Compass;
