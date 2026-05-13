import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface PasswordResetSuccessScreenProps {
  onGoToLogin: () => void;
}

const PasswordResetSuccessScreen: React.FC<PasswordResetSuccessScreenProps> = ({
  onGoToLogin,
}) => {
  return (
    <View style={styles.container}>
      <CommonBoldHeading style={styles.title}>Password Reset Successful</CommonBoldHeading>

      <CustomText style={styles.message}>
        Your password has been updated successfully. You can now log in using your new
        password.
      </CustomText>

      <View style={styles.buttonWrap}>
        <CommonActionableButton
          label="Go to Login"
          handleClick={onGoToLogin}
          height={52}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
  },
  title: {
    color: COLORS.black,
    fontSize: 24,
    marginBottom: SPACING.lg,
  },
  message: {
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
  },
  buttonWrap: {
    marginTop: SPACING.huge,
  },
});

export default PasswordResetSuccessScreen;
