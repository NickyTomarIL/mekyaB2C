import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {
  AuthOrDivider,
  AuthPhoneInputField,
  AuthSocialLoginRow,
  AuthTermsConsent,
} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import {CommonInputField} from '@/components/inputs';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';

interface SignupScreenProps {
  onNext?: () => void;
}

const noop = (): void => undefined;

const SignupScreen: React.FC<SignupScreenProps> = ({onNext}) => {
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const canProceed = useMemo(
    () =>
      termsAccepted &&
      email.trim().length > 0 &&
      mobileNumber.trim().length >= 10,
    [email, mobileNumber, termsAccepted],
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CommonBoldHeading style={styles.title}>Sign Up</CommonBoldHeading>

        <View style={styles.fieldGap}>
          <CommonInputField
            title="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email id"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            height={58}
          />
        </View>

        <View style={styles.fieldGap}>
          <CustomText style={styles.fieldLabel}>Mobile Number</CustomText>
          <AuthPhoneInputField
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            height={58}
          />
        </View>

        <AuthTermsConsent
          checked={termsAccepted}
          onToggle={() => setTermsAccepted(v => !v)}
          onTermsPress={noop}
          onPrivacyPress={noop}
          introText="By signing in, you are agreeing to our"
        />

        <View style={styles.nextButtonWrap}>
          <CommonActionableButton
            label="Next"
            handleClick={onNext ?? noop}
            disabled={!canProceed}
            height={58}
          />
        </View>

        <AuthOrDivider />

        <AuthSocialLoginRow
          mode="email"
          onGooglePress={noop}
          onApplePress={noop}
          onAlternateAuthPress={noop}
        />

        <View style={styles.footer}>
          <CustomText style={styles.footerText}>
            Already have an account?{' '}
            <CustomText style={styles.loginLink} onPress={noop}>
              Login
            </CustomText>
          </CustomText>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 26,
    color: COLORS.black,
    marginBottom: SPACING.xxl,
  },
  fieldGap: {
    marginBottom: SPACING.xl,
  },
  fieldLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  nextButtonWrap: {
    marginBottom: SPACING.sm,
  },
  footer: {
    marginTop: SPACING.xxl,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: COLORS.darkGray,
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;
