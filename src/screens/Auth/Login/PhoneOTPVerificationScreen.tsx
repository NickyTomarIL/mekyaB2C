import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  AuthBrandHeader,
  AuthOtpInput,
  AuthScreenCard,
} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {useOtpResendTimer} from '@/hooks/useOtpResendTimer';
import type {RootStackParamList} from '@/navigation/types';
import {SPACING} from '@/theme/spacing';

type OtpNav = NativeStackNavigationProp<RootStackParamList, 'PhoneOTPVerification'>;

const PHONE_NUMBER = '+91 9876543210';

const PhoneOTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation<OtpNav>();
  const [otp, setOtp] = useState('');
  const {canResend, formattedTime, restart} = useOtpResendTimer({durationSeconds: 30});

  const canSubmit = useMemo(() => otp.length === 6, [otp.length]);

  const handleResendOtp = () => {
    // Wire to resend OTP API when available
    restart();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.authBackground} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <AuthBrandHeader />
          </View>

          <AuthScreenCard style={styles.card}>
            <CommonBoldHeading style={styles.title}>OTP Verification</CommonBoldHeading>

            <CustomText style={styles.message}>
              You will receive OTP on{' '}
              <CustomText style={styles.phoneHighlight}>{PHONE_NUMBER}</CustomText>
            </CustomText>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Change mobile number"
              onPress={() => navigation.navigate('LoginWithPhone')}
              style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
              <CustomText style={styles.changeNumberLink}>
                Change mobile number
              </CustomText>
            </Pressable>

            <CustomText style={styles.enterOtpLabel}>Enter OTP</CustomText>

            <AuthOtpInput value={otp} onChange={setOtp} />

            <View style={styles.timerRow}>
              {canResend ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Resend OTP"
                  onPress={handleResendOtp}
                  style={({pressed}) => [pressed ? styles.linkPressed : null]}>
                  <CustomText style={styles.resendText}>Resend OTP</CustomText>
                </Pressable>
              ) : (
                <CustomText style={styles.timerText}>{formattedTime}</CustomText>
              )}
            </View>

            <View style={styles.buttonWrap}>
              <CommonActionableButton
                label="Login"
                handleClick={() => undefined}
                disabled={!canSubmit}
                height={58}
              />
            </View>
          </AuthScreenCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.authBackground,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    height: '30%',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.xxl,
  },
  card: {
    paddingBottom: SPACING.xxl,
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 26,
    marginBottom: SPACING.lg,
    color: COLORS.black,
  },
  message: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
  },
  phoneHighlight: {
    fontFamily: fontFamilies.medium,
    color: COLORS.splash,
  },
  changeNumberLink: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.darkGray,
    textDecorationLine: 'underline',
    marginBottom: SPACING.xxl,
  },
  enterOtpLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.darkGray,
    marginBottom: SPACING.lg,
  },
  timerRow: {
    marginTop: SPACING.xl,
    alignItems: 'flex-end',
  },
  timerText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.splash,
  },
  resendText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  linkPressed: {
    opacity: 0.7,
  },
  buttonWrap: {
    marginTop: 'auto',
    paddingTop: SPACING.massive,
  },
});

export default PhoneOTPVerificationScreen;
