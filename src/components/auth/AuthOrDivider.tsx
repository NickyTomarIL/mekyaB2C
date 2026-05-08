import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const AuthOrDivider: React.FC = () => {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.label}>OR</Text>
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
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.disabled,
    marginHorizontal: SPACING.lg,
    letterSpacing: 1,
  },
});

export default AuthOrDivider;
