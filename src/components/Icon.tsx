import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useColors } from '../hooks';

interface IconProps {
  name: keyof typeof Feather.glyphMap;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 24 }) => {
  const colors = useColors();

  return <Feather name={name} size={size} color={colors('textPrimary')} />;
};

export default Icon;
