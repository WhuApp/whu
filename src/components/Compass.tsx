import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from '../atoms/Icon';
import { useColors } from '../hooks';
import { Location } from '../types';
import { calculateBearing } from '../utils/location';
import useLocation from './context/LocationContext';

interface CompassProps {
  loc: Location;
  devMode?: boolean;
}

const Compass: React.FC<CompassProps> = ({ loc, devMode = false }) => {
  const { location, heading } = useLocation();
  const colors = useColors();

  if (!location || (loc && devMode) || !heading) {
    return <ActivityIndicator />;
  }

  const bearing = devMode ? heading : calculateBearing(location, loc) - heading;

  return (
    <View
      style={{
        alignSelf: 'center',
        borderRadius: 10000,
        backgroundColor: colors('backgroundTertiary'),
      }}
    >
      <View
        style={{
          transform: [
            {
              rotate: `${bearing}rad`,
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
