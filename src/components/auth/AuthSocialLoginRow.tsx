import {AppleIcon, GoogleIcon, PhoneIcon} from '@/assets/icons';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import AuthSocialLoginButton from './AuthSocialLoginButton';

export interface AuthSocialLoginRowProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  onPhonePress: () => void;
  phoneLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const ICON_SIZE = 20;

const AuthSocialLoginRow: React.FC<AuthSocialLoginRowProps> = ({
  onGooglePress,
  onApplePress,
  onPhonePress,
  phoneLabel = 'Mobile no.',
  style,
}) => {
  return (
    <View style={[styles.row, style]}>
      <AuthSocialLoginButton
        label="Google"
        onPress={onGooglePress}
        icon={<GoogleIcon width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <View style={styles.spacer} />
      <AuthSocialLoginButton
        label="Apple"
        onPress={onApplePress}
        icon={<AppleIcon width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <View style={styles.spacer} />
      <AuthSocialLoginButton
        label={phoneLabel}
        onPress={onPhonePress}
        icon={<PhoneIcon width={ICON_SIZE} height={ICON_SIZE} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  spacer: {
    width: SPACING.sm,
  },
});

export default AuthSocialLoginRow;
