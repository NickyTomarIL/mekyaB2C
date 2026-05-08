import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  AuthBrandHeader,
  AuthCheckbox,
  AuthOrDivider,
  AuthPasswordField,
  AuthScreenCard,
  AuthSocialLoginButton,
} from '@/components/auth';
import CommandActionableButton from '@/components/buttons/CommandActionableButton';
import { CommonBoldHeading, CustomText } from '@/components/common';
import { CommonInputField } from '@/components/inputs';
import COLORS from '@/constants/colors';
import { fontFamilies } from '@/constants/fonts';
import type { RootStackParamList } from '@/navigation/types';
import { SPACING } from '@/theme/spacing';
import { GoogleIcon, PhoneIcon } from '@/assets/icons';

type LoginNav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const noop = (): void => undefined;

const LoginWithEmailScreen: React.FC = () => {
  const navigation = useNavigation<LoginNav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const canSubmit = useMemo(
    () =>
      termsAccepted &&
      email.trim().length > 0 &&
      password.length > 0,
    [email, password, termsAccepted],
  );

  const handleLogin = useCallback(() => {
    if (!canSubmit) {
      return;
    }
  }, [canSubmit]);

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
              <CommonInputField
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                height={52}
                accessibilityLabel="Email address"
              />
            </View>

            <View style={styles.fieldGap}>
              <AuthPasswordField
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password"
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
                onPress={() => navigation.navigate('ForgotPasswordEmail')}
                style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                <CustomText style={styles.link}>Forget Password?</CustomText>
              </Pressable>
            </View>

            <View style={styles.termsRow}>
              <AuthCheckbox
                checked={termsAccepted}
                onToggle={() => setTermsAccepted(v => !v)}
              />
              <CustomText style={styles.termsText}>
                By logging in, you are agreeing to our{' '}
                <CustomText style={styles.linkInline} onPress={noop}>
                  Terms of Service
                </CustomText>
                . Please make sure you read{' '}
                <CustomText style={styles.linkInline} onPress={noop}>
                  Privacy policies
                </CustomText>{' '}
                to have a great experience on our platform.
              </CustomText>
            </View>

            <View style={styles.loginButtonWrap}>
              <CommandActionableButton
                label="Login"
                handleClick={handleLogin}
                disabled={!canSubmit}
                height={52}
              />
            </View>

            <AuthOrDivider />

            <View style={styles.socialRow}>
              <AuthSocialLoginButton
                label="Google"
                onPress={noop}
                icon={
                  <GoogleIcon width={20} height={20} />
                }
              />
              <View style={styles.socialSpacer} />
              <AuthSocialLoginButton
                label="Apple"
                onPress={noop}
                icon={<Ionicons name="logo-apple" size={20} color={COLORS.black} />}
              />
              <View style={styles.socialSpacer} />
              <AuthSocialLoginButton
                label="Mobile no."
                onPress={() => navigation.navigate('LoginWithPhone')}
                icon={
                  <PhoneIcon width={20} height={20} />
                }
              />
            </View>
            <View style={styles.footer}>
              <CustomText style={styles.footerText}>
                New here?{' '}
                <CustomText
                  style={styles.linkInline}
                  onPress={() => navigation.navigate('Signup')}>
                  Sign up
                </CustomText>
              </CustomText>
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
  title: {
    fontSize: 28,
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
    fontSize: 14,
    color: COLORS.darkGray,
  },
  link: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  termsText: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.darkGray,
  },
  linkInline: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  loginButtonWrap: {
    marginBottom: SPACING.sm,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  socialSpacer: {
    width: SPACING.sm,
  },
  footer: {
    paddingVertical: SPACING.xxl,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});

export default LoginWithEmailScreen;
