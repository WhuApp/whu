import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';
import { useColors } from '../utils';

interface CompassProps {
  direction: number;
}

const Compass: React.FC<CompassProps> = ({ direction }) => {
  const colors = useColors();

  return (
    <View style={{ borderRadius: 10000, backgroundColor: colors('backgroundTertiary') }}>
      <View style={{ transform: [{ rotate: `${direction}deg` }] }}>
        <Icon name='arrow-up' />
      </View>
    </View>
  );
};

export default Compass;
