import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const SecurityScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.body}>
        Security — placeholder. Password, 2FA, and sessions here.
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  body: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
});

export default SecurityScreen;
