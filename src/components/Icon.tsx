import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
};

const Icon: React.FC<IconProps> = ({ name, size = 26 }) => {
  const colorScheme = useColorScheme();

  return (
    <Feather 
      name={name as any} // TODO: Use actual type 
      size={size} 
      color={colorScheme === 'dark' ? 'white' : 'black'} 
    />
  );
};

export default Icon;
