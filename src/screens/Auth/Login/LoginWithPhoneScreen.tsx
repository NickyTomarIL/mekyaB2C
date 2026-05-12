import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useState} from 'react';
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
  AuthCheckbox,
  AuthOrDivider,
  AuthPhoneInputField,
  AuthScreenCard,
  AuthSignupModal,
  AuthSocialLoginRow,
  AuthTermsConsent,
} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import ForgotPasswordFlowNavigator from '@/navigation/ForgotPasswordFlowNavigator';
import SignupFlowNavigator from '@/navigation/SignupFlowNavigator';
import type {RootStackParamList} from '@/navigation/types';
import {SPACING} from '@/theme/spacing';

type LoginPhoneNav = NativeStackNavigationProp<RootStackParamList, 'LoginWithPhone'>;

const noop = (): void => undefined;

const LoginWithPhoneScreen: React.FC = () => {
  const navigation = useNavigation<LoginPhoneNav>();
  const [mobileNumber, setMobileNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] =
    useState(false);

  const canSubmit = useMemo(
    () => termsAccepted && mobileNumber.trim().length >= 10,
    [mobileNumber, termsAccepted],
  );

  const handleGetOtp = useCallback(() => {
    if (!canSubmit) {
      return;
    }
    navigation.navigate('PhoneOTPVerification');
  }, [canSubmit, navigation]);

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

          <AuthScreenCard>
            <CommonBoldHeading style={styles.title}>Login</CommonBoldHeading>

            <View style={styles.fieldGap}>
              <AuthPhoneInputField
                value={mobileNumber}
                onChangeText={setMobileNumber}
                maxLength={10}
                accessibilityLabel="Enter 10-digit phone number"

              />
            </View>

            <View style={styles.optionsRow}>
              <View style={styles.rememberBlock}>
                <AuthCheckbox
                  checked={rememberMe}
                  onToggle={() => setRememberMe(v => !v)}
                />
                <CustomText style={styles.rememberLabel}>Remember me.</CustomText>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Forgot password"
                onPress={() => setIsForgotPasswordModalVisible(true)}
                style={({pressed}) => ({opacity: pressed ? 0.7 : 1})}>
                <CustomText style={styles.forgotPasswordLabel}>
                  Forget Password?
                </CustomText>
              </Pressable>
            </View>

            <AuthTermsConsent
              checked={termsAccepted}
              onToggle={() => setTermsAccepted(v => !v)}
              onTermsPress={noop}
              onPrivacyPress={noop}
            />

            <View style={styles.loginButtonWrap}>
              <CommonActionableButton
                label="Get OTP"
                handleClick={handleGetOtp}
                disabled={!canSubmit}
                height={52}
              />
            </View>

            <AuthOrDivider />

            <AuthSocialLoginRow
              mode="phone"
              onGooglePress={noop}
              onApplePress={noop}
              onAlternateAuthPress={() => navigation.navigate('Login')}
            />

            <View style={styles.footer}>
              <CustomText style={styles.footerText}>
                New here?{' '}
                <CustomText
                  style={styles.linkInline}
                  onPress={() => setIsSignupModalVisible(true)}>
                  Sign up
                </CustomText>
              </CustomText>
            </View>
          </AuthScreenCard>
        </ScrollView>
      </KeyboardAvoidingView>
      <AuthSignupModal
        visible={isSignupModalVisible}
        onClose={() => setIsSignupModalVisible(false)}>
        <SignupFlowNavigator onRequestClose={() => setIsSignupModalVisible(false)} />
      </AuthSignupModal>
      <AuthSignupModal
        visible={isForgotPasswordModalVisible}
        onClose={() => setIsForgotPasswordModalVisible(false)}>
        <ForgotPasswordFlowNavigator
          onRequestClose={() => setIsForgotPasswordModalVisible(false)}
        />
      </AuthSignupModal>
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
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 26,
    marginBottom: SPACING.xxl,
    color: COLORS.black,
  },
  fieldGap: {
    marginBottom: SPACING.lg,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  rememberBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  rememberLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.darkGray,
  },
  forgotPasswordLabel: {
    fontSize: 12,
    color: COLORS.darkGray,
    textDecorationLine: 'underline',
  },
  linkInline: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  loginButtonWrap: {
    marginBottom: SPACING.sm,
  },
  footer: {
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});

export default LoginWithPhoneScreen;
