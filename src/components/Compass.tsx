import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Icon from '../atoms/Icon';
import { useColors, useLiveLocation, useLiveHeading } from '../hooks';
import { Location } from '../types';
import { calculateBearing } from '../utils/location';

interface CompassProps {
  location: Location;
}

const Compass: React.FC<CompassProps> = ({ location }) => {
  const heading = useLiveHeading(); // TODO: use something else e.g. maybe animation or memo -> ask kai
  const selfLocation = useLiveLocation();
  const colors = useColors();

  if (!location || !selfLocation || !heading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ borderRadius: 10000, backgroundColor: colors('backgroundTertiary') }}>
      <View
        style={{
          transform: [
            {
              rotate: `${
                (Math.floor(calculateBearing(selfLocation, location) - heading) + 360) % 360
              }deg`,
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
