import React from 'react';
import { Text, useColorScheme } from 'react-native';
import ModalLayout from '../layouts/ModalLayout';
import { useColors } from '../utils';

const Settings: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = useColors();

  return (
    <ModalLayout
      title='Settings'
      onPressMore={() => { }}
    >
      <Text style={{ color: colors('textPrimary') }}>
        Color scheme: {colorScheme}
      </Text>
    </ModalLayout>
  );
};

export default Settings;
