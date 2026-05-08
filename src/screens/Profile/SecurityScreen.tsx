import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import CustomText from '@/components/common/CustomText';
import CommonInputField from '@/components/inputs/CommonInputField';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const INPUT_HEIGHT = 52;

const labelTitleStyle = {
  fontFamily: fontFamilies.semiBold,
  fontSize: 14,
  color: COLORS.black,
};

const emailReadOnlyInputStyle = {
  color: COLORS.textMuted,
  fontFamily: fontFamilies.regular,
  fontSize: 14,
};

const passwordInputStyle = {
  color: COLORS.black,
  fontFamily: fontFamilies.regular,
  fontSize: 14,
};

type PasswordRules = {
  minLength: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
};

function evaluatePasswordRules(password: string): PasswordRules {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
}

type RequirementRowProps = {
  label: string;
  satisfied: boolean;
};

function RequirementRow({label, satisfied}: RequirementRowProps): React.JSX.Element {
  return (
    <View style={styles.requirementRow} accessibilityRole="text">
      <Ionicons
        name={satisfied ? 'checkbox' : 'square-outline'}
        size={18}
        color={satisfied ? COLORS.splash : COLORS.textMuted}
        style={styles.requirementIcon}
      />
      <CustomText style={styles.requirementLabel}>{label}</CustomText>
    </View>
  );
}

const SecurityScreen: React.FC = () => {
  const [email] = useState('jatinpant03@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const rules = useMemo(
    () => evaluatePasswordRules(newPassword),
    [newPassword],
  );

  const allRulesMet =
    rules.minLength &&
    rules.hasUpper &&
    rules.hasNumber &&
    rules.hasSpecial;

  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  const canSubmit =
    email.trim().length > 0 &&
    currentPassword.length > 0 &&
    allRulesMet &&
    passwordsMatch;

  const onUpdatePassword = useCallback(() => {
    if (!canSubmit) {
      return;
    }
    Keyboard.dismiss();
    Alert.alert(
      'Password updated',
      'Your password has been updated. (Connect to API when available.)',
    );
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [canSubmit]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <CommonInputField
            title="Email Address*"
            value={email}
            onChangeText={() => undefined}
            placeholder="Email"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={emailReadOnlyInputStyle}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            editable={false}
            selectTextOnFocus={false}
          />
          <View style={styles.gap} />
          <CommonInputField
            title="Current Password*"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={passwordInputStyle}
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.gap} />
          <CommonInputField
            title="New Password*"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={passwordInputStyle}
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.requirementsBlock}>
            <RequirementRow label="Min. 8 characters" satisfied={rules.minLength} />
            <RequirementRow label="Includes uppercase" satisfied={rules.hasUpper} />
            <RequirementRow label="Includes number" satisfied={rules.hasNumber} />
            <RequirementRow label="Special character" satisfied={rules.hasSpecial} />
          </View>
          <View style={styles.gap} />
          <CommonInputField
            title="Confirm New Password*"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            height={INPUT_HEIGHT}
            titleStyle={labelTitleStyle}
            inputStyle={passwordInputStyle}
            secureTextEntry
            textContentType="newPassword"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <CommonActionableButton
            label="Update New Password"
            handleClick={onUpdatePassword}
            height={52}
            disabled={!canSubmit}
            containerStyle={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  form: {
    alignSelf: 'stretch',
  },
  gap: {
    height: SPACING.lg,
  },
  requirementsBlock: {
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requirementIcon: {
    marginRight: SPACING.sm,
  },
  requirementLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.textMuted,
    flex: 1,
  },
  submitButton: {
    borderRadius: 8,
    marginTop: SPACING.xxl,
  },
});

export default SecurityScreen;
