import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../atoms/Icon';
import { useColors } from '../../hooks';
import { Feather } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  backgroundColor?: string;
}

// TODO: Only atoms should care about styling, components should only handle functionality
const IconButton: React.FC<IconButtonProps> = ({ icon, onPress, backgroundColor }) => {
  const colors = useColors();

  const buttonStyle = {
    padding: 14,
    backgroundColor: backgroundColor ?? colors('backgroundTertiary', 'light'),
    borderRadius: 10000,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Icon name={icon} color={colors('textPrimary', 'light')} />
    </TouchableOpacity>
  );
};

export default IconButton;
