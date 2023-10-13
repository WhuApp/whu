import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../atoms/Icon';
import { useColors } from '../../hooks';
import { Feather } from '@expo/vector-icons';

interface IconButtonProps {
  icon: keyof typeof Feather.glyphMap;
  onPress?: () => void;
  background?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
  padding?: number;
}

// TODO: Only atoms should care about styling, components should only handle functionality
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  backgroundColor,
  disabled,
  background = true,
  padding = 8,
}) => {
  const colors = useColors();

  const buttonStyle = {
    padding: padding,
    backgroundColor: backgroundColor ?? colors('backgroundTertiary'),
    borderRadius: 10000,
  };

  return (
    <TouchableOpacity style={background ? buttonStyle : null} onPress={onPress} disabled={disabled}>
      <Icon name={icon} color={disabled ? colors('textTertiary') : colors('textPrimary')} />
    </TouchableOpacity>
  );
};

export default IconButton;
