import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import {CommonBoldHeading, CustomText} from '@/components/common';
import {CommonInputField} from '@/components/inputs';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

interface ForgotPasswordEmailScreenProps {
  onUseMobileInstead?: () => void;
}

const ForgotPasswordEmailScreen: React.FC<ForgotPasswordEmailScreenProps> = ({
  onUseMobileInstead,
}) => {
  const [email, setEmail] = useState('');

  const canProceed = useMemo(() => {
    const trimmedEmail = email.trim();
    return (
      trimmedEmail.length > 0 &&
      trimmedEmail.includes('@') &&
      trimmedEmail.includes('.')
    );
  }, [email]);

  return (
    <View style={styles.container}>
      <CommonBoldHeading style={styles.title}>Reset Your Password</CommonBoldHeading>
      <CustomText style={styles.description}>
        Enter an email id that might be associated with your Mekya account. If it
        matches, we&apos;ll send you a code.
      </CustomText>

      <View style={styles.formBlock}>
        <CommonInputField
          title="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your registered email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          height={52}
          accessibilityLabel="Enter your registered email"
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Use mobile instead"
          onPress={onUseMobileInstead}
          style={({pressed}) => [styles.linkWrap, pressed ? styles.linkPressed : null]}>
          <CustomText style={styles.link}>Use mobile instead</CustomText>
        </Pressable>
      </View>

      <View style={styles.buttonWrap}>
        <CommonActionableButton
          label="Next"
          handleClick={() => undefined}
          disabled={!canProceed}
          height={52}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.huge,
  },
  title: {
    color: COLORS.black,
    fontSize: 21,
    marginBottom: SPACING.md,
  },
  description: {
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
  },
  formBlock: {
    marginTop: SPACING.massive,
  },
  linkWrap: {
    marginTop: SPACING.lg,
    alignSelf: 'flex-start',
  },
  linkPressed: {
    opacity: 0.7,
  },
  link: {
    color: COLORS.splash,
    fontFamily: fontFamilies.medium,
    fontSize: 13,
  },
  buttonWrap: {
    marginTop: SPACING.huge,
  },
});

export default ForgotPasswordEmailScreen;
