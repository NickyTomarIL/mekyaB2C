import {AuthPasswordField} from '@/components/auth';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CreateNewPasswordScreenProps {
  onUpdatePassword?: () => void;
}

const CreateNewPasswordScreen: React.FC<CreateNewPasswordScreenProps> = ({
  onUpdatePassword,
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

  const handleUpdatePassword = (): void => {
    if (!canSubmit) {
      return;
    }
    onUpdatePassword?.();
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <CommonBoldHeading style={styles.title}>Create New Password</CommonBoldHeading>

        <View style={styles.fieldGap}>
          <CustomText style={styles.fieldLabel}>Create New Password</CustomText>
          <AuthPasswordField
            value={password}
            onChangeText={setPassword}
            placeholder="Create new password"
            height={52}
          />
        </View>

        <View style={styles.criteriaWrap}>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasMinLength ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasMinLength ? COLORS.success : COLORS.borderInput}
            />
            <CustomText
              style={[
                styles.criteriaText,
                passwordRules.hasMinLength ? styles.criteriaTextMet : null,
              ]}>
              At least 8 characters
            </CustomText>
          </View>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasUpperAndLower ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasUpperAndLower ? COLORS.success : COLORS.borderInput}
            />
            <CustomText
              style={[
                styles.criteriaText,
                passwordRules.hasUpperAndLower ? styles.criteriaTextMet : null,
              ]}>
              One uppercase & lowercase letter
            </CustomText>
          </View>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasNumber ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasNumber ? COLORS.success : COLORS.borderInput}
            />
            <CustomText
              style={[
                styles.criteriaText,
                passwordRules.hasNumber ? styles.criteriaTextMet : null,
              ]}>
              Includes number
            </CustomText>
          </View>
          <View style={styles.criteriaRow}>
            <Ionicons
              name={passwordRules.hasSpecial ? 'checkmark' : 'ellipse-outline'}
              size={16}
              color={passwordRules.hasSpecial ? COLORS.success : COLORS.borderInput}
            />
            <CustomText
              style={[
                styles.criteriaText,
                passwordRules.hasSpecial ? styles.criteriaTextMet : null,
              ]}>
              special character (!@#$%^&*)
            </CustomText>
          </View>
        </View>

        <View style={styles.fieldGap}>
          <CustomText style={styles.fieldLabel}>Confirm New Password</CustomText>
          <AuthPasswordField
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your new password"
            height={52}
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

        <View style={styles.buttonWrap}>
          <CommonActionableButton
            label="Update New Password"
            handleClick={handleUpdatePassword}
            disabled={!canSubmit}
            height={52}
          />
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
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xxxl,
  },
  title: {
    color: COLORS.black,
    fontSize: 21,
    marginBottom: SPACING.xxl,
  },
  fieldGap: {
    marginBottom: SPACING.xl,
  },
  fieldLabel: {
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
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
    color: COLORS.validationColor,
  },
  criteriaTextMet: {
    color: COLORS.success,
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
  buttonWrap: {
    marginTop: SPACING.lg,
  },
});

export default CreateNewPasswordScreen;
