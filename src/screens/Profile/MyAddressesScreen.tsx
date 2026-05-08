import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const MyAddressesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.body}>
        My Addresses — placeholder. Manage shipping addresses here.
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

export default MyAddressesScreen;
