import {AuthOtpInput} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

interface VerifyPhoneOTPScreenProps {
  onChangeMobileNumber?: () => void;
  onNext?: () => void;
  phoneNumber?: string;
}

const VerifyPhoneOTPScreen: React.FC<VerifyPhoneOTPScreenProps> = ({
  onChangeMobileNumber,
  onNext,
  phoneNumber = '+91 9876543210',
}) => {
  const [otp, setOtp] = useState('');
  const canProceed = useMemo(() => otp.length === 6, [otp.length]);

  return (
    <View style={styles.container}>
      <CommonBoldHeading style={styles.title}>Verify Your Number</CommonBoldHeading>

      <CustomText style={styles.message}>
        OTP has been sent to{' '}
        <CustomText style={styles.contactHighlight}>{phoneNumber}</CustomText>
      </CustomText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change mobile number"
        onPress={onChangeMobileNumber}
        style={({pressed}) => [styles.changeLinkWrap, pressed ? styles.linkPressed : null]}>
        <CustomText style={styles.changeLink}>Change mobile number</CustomText>
      </Pressable>

      <CustomText style={styles.enterOtpLabel}>Enter OTP</CustomText>
      <AuthOtpInput value={otp} onChange={setOtp} />

      <View style={styles.timerRow}>
        <CustomText style={styles.timerText}>00:30 sec</CustomText>
      </View>

      <View style={styles.buttonWrap}>
        <CommonActionableButton
          label="Next"
          handleClick={onNext ?? (() => undefined)}
          disabled={!canProceed}
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
    paddingTop: SPACING.huge,
  },
  title: {
    color: COLORS.black,
    fontSize: 21,
    marginBottom: SPACING.xl,
  },
  message: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  contactHighlight: {
    color: COLORS.splash,
    fontFamily: fontFamilies.medium,
  },
  changeLinkWrap: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.huge,
  },
  changeLink: {
    color: COLORS.darkGray,
    fontFamily: fontFamilies.medium,
    fontSize: 15 / 1.1,
    textDecorationLine: 'underline',
  },
  linkPressed: {
    opacity: 0.7,
  },
  enterOtpLabel: {
    color: COLORS.darkGray,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    marginBottom: SPACING.lg,
  },
  timerRow: {
    marginTop: SPACING.xl,
    alignItems: 'flex-end',
  },
  timerText: {
    color: COLORS.splash,
    fontFamily: fontFamilies.semiBold,
    fontSize: 15 / 1.1,
  },
  buttonWrap: {
    marginTop: SPACING.huge,
  },
});

export default VerifyPhoneOTPScreen;
