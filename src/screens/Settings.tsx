import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { useColors } from '../hooks';
import { BaseLayout } from '../layouts';

const Settings: React.FC = () => {
  const colorScheme = useColorScheme();
  const colors = useColors();

  return (
    <BaseLayout>
      <Text style={{ color: colors('textPrimary') }}>Color scheme: {colorScheme}</Text>
    </BaseLayout>
  );
};

export default Settings;
