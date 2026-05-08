import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CustomText} from '@/components/common';
import ForgotPasswordEmailScreen from '@/screens/Auth/ForgotPassword/ForgotPasswordEmailScreen';
import ForgotPasswordPhoneScreen from '@/screens/Auth/ForgotPassword/ForgotPasswordPhoneScreen';
import PasswordResetSuccessScreen from '@/screens/Auth/ForgotPassword/PasswordResetSuccessScreen';
import VerifyEmailOTPScreen from '@/screens/Auth/ForgotPassword/VerifyEmailOTPScreen';
import VerifyPhoneOTPScreen from '@/screens/Auth/ForgotPassword/VerifyPhoneOTPScreen';
import CreateNewPasswordScreen from '@/screens/Auth/ForgotPassword/CreateNewPasswordScreen';
import {SPACING} from '@/theme/spacing';
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

interface ForgotPasswordFlowNavigatorProps {
  onRequestClose?: () => void;
}

type ForgotPasswordFlowStepKey =
  | 'email'
  | 'phone'
  | 'verifyEmailOtp'
  | 'verifyPhoneOtp'
  | 'createNewPassword'
  | 'success';

const steps = [
  'email',
  'phone',
  'verifyEmailOtp',
  'verifyPhoneOtp',
  'createNewPassword',
  'success',
] as const satisfies ReadonlyArray<ForgotPasswordFlowStepKey>;

const ForgotPasswordFlowNavigator: React.FC<ForgotPasswordFlowNavigatorProps> = ({
  onRequestClose,
}) => {
  const [index, setIndex] = useState(0);
  const isLastStep = index === steps.length - 1;
  const currentStep = steps[index];

  const progressLabel = useMemo(
    () => `Step ${index + 1} of ${steps.length}`,
    [index],
  );

  const goNext = (): void => {
    if (isLastStep) {
      onRequestClose?.();
      return;
    }
    setIndex(prev => prev + 1);
  };

  const goBack = (): void => {
    if (index === 0) {
      onRequestClose?.();
      return;
    }
    setIndex(prev => prev - 1);
  };

  const goToStep = (step: ForgotPasswordFlowStepKey): void => {
    const nextIndex = steps.indexOf(step);
    if (nextIndex >= 0) {
      setIndex(nextIndex);
    }
  };

  const renderCurrentStep = (): React.ReactNode => {
    switch (currentStep) {
      case 'email':
        return (
          <ForgotPasswordEmailScreen
            onUseMobileInstead={() => goToStep('phone')}
          />
        );
      case 'phone':
        return (
          <ForgotPasswordPhoneScreen
            onUseEmailInstead={() => goToStep('email')}
          />
        );
      case 'verifyEmailOtp':
        return (
          <VerifyEmailOTPScreen
            onChangeEmailAddress={() => goToStep('email')}
            onNext={() => goToStep('createNewPassword')}
          />
        );
      case 'verifyPhoneOtp':
        return (
          <VerifyPhoneOTPScreen
            onChangeMobileNumber={() => goToStep('phone')}
            onNext={() => goToStep('createNewPassword')}
          />
        );
      case 'createNewPassword':
        return <CreateNewPasswordScreen />;
      case 'success':
        return <PasswordResetSuccessScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenWrap}>
        {renderCurrentStep()}
      </View>

      <View style={styles.footer}>
        <CustomText style={styles.progress}>{progressLabel}</CustomText>
        <View style={styles.actions}>
          <CommonActionableButton
            label={index === 0 ? 'Close' : 'Back'}
            handleClick={goBack}
            containerStyle={styles.backButton}
            labelStyle={styles.backLabel}
          />
          <View style={styles.buttonSpacer} />
          <CommonActionableButton
            label={isLastStep ? 'Done' : 'Next'}
            handleClick={goNext}
            containerStyle={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrap: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: SPACING.xxl,
    paddingBottom: SPACING.xxl,
    paddingTop: SPACING.md,
  },
  progress: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSpacer: {
    width: SPACING.sm,
  },
  backButton: {
    flex: 1,
  },
  backLabel: {
    fontSize: 12,
  },
  nextButton: {
    flex: 1,
  },
});

export default ForgotPasswordFlowNavigator;
