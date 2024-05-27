import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from 'react-native-paper';

interface AppBackgroundProps extends ViewProps {
  children: React.ReactNode;
}

const AppBackground: React.FC<AppBackgroundProps> = ({
  children,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background }, style]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppBackground;
