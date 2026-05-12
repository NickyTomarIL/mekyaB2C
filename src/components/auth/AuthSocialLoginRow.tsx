import {AppleIcon, GoogleIcon, PhoneIcon} from '@/assets/icons';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthSocialLoginButton from './AuthSocialLoginButton';

export interface AuthSocialLoginRowProps {
  onGooglePress: () => void;
  onApplePress: () => void;
  onAlternateAuthPress: () => void;
  mode: 'email' | 'phone';
  phoneLabel?: string;
  emailLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const ICON_SIZE = 20;

const AuthSocialLoginRow: React.FC<AuthSocialLoginRowProps> = ({
  onGooglePress,
  onApplePress,
  onAlternateAuthPress,
  mode,
  phoneLabel = 'Mobile no',
  emailLabel = 'Email',
  style,
}) => {
  const showPhone = mode === 'email';

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
        label={showPhone ? phoneLabel : emailLabel}
        onPress={onAlternateAuthPress}
        icon={
          showPhone ? (
            <PhoneIcon width={ICON_SIZE} height={ICON_SIZE} />
          ) : (
            <Ionicons name="mail-outline" size={ICON_SIZE} color="#333333" />
          )
        }
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
