import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  AuthOrDivider,
  AuthPasswordField,
  AuthSocialLoginRow,
} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';

interface SignupPasswordCreationScreenProps {
  onBack?: () => void;
  onCreateAccount?: () => void;
}

const SignupPasswordCreationScreen: React.FC<SignupPasswordCreationScreenProps> = ({
  onBack,
  onCreateAccount,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordRules = useMemo(
    () => ({
      hasMinLength: password.length >= 8,
      hasUpperAndLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    }),
    [password],
  );

  const hasPasswordMismatch =
    confirmPassword.length > 0 && confirmPassword !== password;

  const canSubmit = password.length > 0 && confirmPassword.length > 0;

  const handleCreateAccount = (): void => {
    if (!canSubmit) {
      return;
    }
    if (onCreateAccount) {
      onCreateAccount();
      return;
    }
    onBack?.();
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CommonBoldHeading style={styles.title}>Sign Up</CommonBoldHeading>

        <View style={styles.fieldGap}>
          <CustomText style={styles.fieldLabel}>Create Password</CustomText>
          <AuthPasswordField
            value={password}
            onChangeText={setPassword}
            placeholder="H@59rdik.Mekya"
            height={58}
          />
        </View>

        <View style={styles.criteriaWrap}>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasMinLength ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasMinLength ? COLORS.splash : COLORS.borderInput}
            />
            <CustomText style={styles.criteriaText}>At least 8 characters</CustomText>
          </View>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={
                passwordRules.hasUpperAndLower ? 'checkmark' : 'ellipse-outline'
              }
              size={16}
              color={
                passwordRules.hasUpperAndLower ? COLORS.splash : COLORS.borderInput
              }
            />
            <CustomText style={styles.criteriaText}>
              One uppercase & lowercase letter
            </CustomText>
          </View>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasNumber ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasNumber ? COLORS.splash : COLORS.borderInput}
            />
            <CustomText style={styles.criteriaText}>Includes number</CustomText>
          </View>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasSpecial ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasSpecial ? COLORS.splash : COLORS.borderInput}
            />
            <CustomText style={styles.criteriaText}>
              special character (!@#$%^&*)
            </CustomText>
          </View>
        </View>

        <View style={styles.fieldGap}>
          <CustomText style={styles.fieldLabel}>Create Password</CustomText>
          <AuthPasswordField
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="H@59rdik.Mkya"
            height={58}
            containerStyle={hasPasswordMismatch ? styles.errorInput : undefined}
          />
          {hasPasswordMismatch ? (
            <View style={styles.errorRow}>
              <Ionicons
                name="alert-circle-outline"
                size={16}
                color={styles.errorText.color}
              />
              <CustomText style={styles.errorText}>
                Passwords do not match, Please try again.
              </CustomText>
            </View>
          ) : null}
        </View>

        <View style={styles.createButtonWrap}>
          <CommonActionableButton
            label="Create account"
            handleClick={handleCreateAccount}
            disabled={!canSubmit}
            height={58}
          />
        </View>

        <AuthOrDivider />

        <AuthSocialLoginRow
          mode="email"
          onGooglePress={() => undefined}
          onApplePress={() => undefined}
          onAlternateAuthPress={() => undefined}
        />
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
  criteriaWrap: {
    marginBottom: SPACING.xl,
  },
  criteriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  criteriaText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.splash,
  },
  errorInput: {
    borderColor: '#D64545',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  errorText: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: '#B03040',
  },
  createButtonWrap: {
    marginBottom: SPACING.sm,
  },
});

export default SignupPasswordCreationScreen;
