import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomText} from '@/components/common';

const AuthOrDivider: React.FC = () => {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <CustomText style={styles.label}>OR</CustomText>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.borderInput,
  },
  label: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: COLORS.black,
    marginHorizontal: SPACING.lg,
    letterSpacing: 1,
  },
});

export default AuthOrDivider;
