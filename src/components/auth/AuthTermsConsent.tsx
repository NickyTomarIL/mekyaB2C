import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import {CustomText} from '@/components/common';
import AuthCheckbox from './AuthCheckbox';

export interface AuthTermsConsentProps {
  checked: boolean;
  onToggle: () => void;
  onTermsPress: () => void;
  onPrivacyPress: () => void;
  introText?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthTermsConsent: React.FC<AuthTermsConsentProps> = ({
  checked,
  onToggle,
  onTermsPress,
  onPrivacyPress,
  introText = 'By logging in, you are agreeing to our',
  containerStyle,
}) => {
  return (
    <View style={[styles.row, containerStyle]}>
      <AuthCheckbox checked={checked} onToggle={onToggle} />
      <CustomText style={styles.text}>
        {introText}{' '}
        <CustomText style={styles.link} onPress={onTermsPress}>
          Terms of Service
        </CustomText>
        . Please make sure you read{' '}
        <CustomText style={styles.link} onPress={onPrivacyPress}>
          Privacy policies
        </CustomText>{' '}
        to have a great experience on our platform.
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  text: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.darkGray,
  },
  link: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
});

export default AuthTermsConsent;
