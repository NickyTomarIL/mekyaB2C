import SignupPasswordCreationScreen from '@/screens/Auth/Signup/SignupPasswordCreationScreen';
import SignupScreen from '@/screens/Auth/Signup/SignupScreen';
import React, {useCallback, useState} from 'react';

type SignupFlowStep = 'signupMain' | 'signupPasswordCreation';

interface SignupFlowNavigatorProps {
  onRequestClose?: () => void;
}

const SignupFlowNavigator: React.FC<SignupFlowNavigatorProps> = ({
  onRequestClose,
}) => {
  const [step, setStep] = useState<SignupFlowStep>('signupMain');

  const goToPasswordCreation = useCallback(() => {
    setStep('signupPasswordCreation');
  }, []);

  const goToMain = useCallback(() => {
    setStep('signupMain');
  }, []);

  if (step === 'signupPasswordCreation') {
    return <SignupPasswordCreationScreen onBack={goToMain} />;
  }

  return <SignupScreen onNext={goToPasswordCreation} onLogin={onRequestClose} />;
};

export default SignupFlowNavigator;
