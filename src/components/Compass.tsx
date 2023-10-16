import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from '../atoms/Icon';
import { useColors } from '../hooks';
import { Location } from '../types';
import { calculateBearing } from '../utils/location';
import useLocation from './context/LocationContext';

interface CompassProps {
  loc: Location;
}

const Compass: React.FC<CompassProps> = ({ loc }) => {
  const { location, heading } = useLocation();
  const colors = useColors();

  if (!location || !loc || !heading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ borderRadius: 10000, backgroundColor: colors('backgroundTertiary') }}>
      <View
        style={{
          transform: [
            {
              rotate: `${calculateBearing(location, loc) - heading}rad`,
            },
          ],
        }}
      >
        <Icon name='arrow-up' />
      </View>
    </View>
  );
};

export default Compass;
