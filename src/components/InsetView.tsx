import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const InsetView: React.FC<ViewProps> = ({ children, style, ...props }) => {
  const insets = useSafeAreaInsets();
  const customStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    width: '100%',
    height: '100%',
  };

  return (
    <View style={[ customStyle, style ]} {...props} >
      {children}
    </View>
  );
};

export default InsetView;
