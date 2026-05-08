import SignupPasswordCreationScreen from '@/screens/Auth/Signup/SignupPasswordCreationScreen';
import SignupScreen from '@/screens/Auth/Signup/SignupScreen';
import React, {useCallback, useState} from 'react';

type SignupFlowStep = 'signupMain' | 'signupPasswordCreation';

const SignupFlowNavigator: React.FC = () => {
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

  return <SignupScreen onNext={goToPasswordCreation} />;
};

export default SignupFlowNavigator;
