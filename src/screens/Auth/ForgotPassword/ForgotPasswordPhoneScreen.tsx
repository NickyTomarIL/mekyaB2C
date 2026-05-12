import {AuthPhoneInputField} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

interface ForgotPasswordPhoneScreenProps {
  onUseEmailInstead?: () => void;
}

const ForgotPasswordPhoneScreen: React.FC<ForgotPasswordPhoneScreenProps> = ({
  onUseEmailInstead,
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const canProceed = useMemo(() => mobileNumber.trim().length >= 10, [mobileNumber]);

  return (
    <View style={styles.container}>
      <CommonBoldHeading style={styles.title}>Reset Your Password</CommonBoldHeading>
      <CustomText style={styles.description}>
        Enter a phone number that might be associated with your Mekya account. If it
        matches, we&apos;ll send you a code.
      </CustomText>

      <View style={styles.formBlock}>
        <CustomText style={styles.fieldLabel}>Mobile number</CustomText>
        <AuthPhoneInputField
          value={mobileNumber}
          onChangeText={setMobileNumber}
          maxLength={10}
          placeholder="Enter 10-digit phone number"
          accessibilityLabel="Enter mobile number"
          height={52}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Use email address instead"
          onPress={onUseEmailInstead}
          style={({pressed}) => [styles.linkWrap, pressed ? styles.linkPressed : null]}>
          <CustomText style={styles.link}>Use email address instead</CustomText>
        </Pressable>
      </View>

      <View style={styles.buttonWrap}>
        <CommonActionableButton
          label="Next"
          handleClick={() => undefined}
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
    paddingTop: SPACING.xxl,
  },
  title: {
    color: COLORS.black,
    fontSize: 21,
    marginBottom: SPACING.md,
  },
  description: {
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight:24
  },
  formBlock: {
    marginTop: SPACING.massive,
  },
  fieldLabel: {
    color: COLORS.black,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    marginBottom: SPACING.md,
  },
  linkWrap: {
    marginTop: SPACING.lg,
    alignSelf: 'flex-start',
  },
  linkPressed: {
    opacity: 0.7,
  },
  link: {
    color: COLORS.splash,
    fontFamily: fontFamilies.medium,
    fontSize: 12,
  },
  buttonWrap: {
    marginTop: SPACING.huge,
  },
});

export default ForgotPasswordPhoneScreen;
