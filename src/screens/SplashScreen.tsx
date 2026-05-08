import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import {MekyaLogo} from '@/assets/icons';
import COLORS from '@/constants/colors';

const LOGO_SIZE = 160;

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.splash} />
      <MekyaLogo
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        accessible
        accessibilityLabel="Mekya"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.splash,
  },
});

export default SplashScreen;
