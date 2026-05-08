import {MekyaLogoAuth} from '@/assets/icons';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const LOGO_WIDTH = 250;
const LOGO_HEIGHT = 40;

/**
 * Centered Mekya mark + wordmark for auth screens.
 */
const AuthBrandHeader: React.FC = () => {
  return (
    <View
      style={styles.row}
      accessible
      accessibilityRole="header"
      accessibilityLabel="Mekya">
      <MekyaLogoAuth width={LOGO_WIDTH} height={LOGO_HEIGHT} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
  },
});

export default AuthBrandHeader;
