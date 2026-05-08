import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {CustomText} from '@/components/common';

export interface AuthSocialLoginButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const AuthSocialLoginButton: React.FC<AuthSocialLoginButtonProps> = ({
  label,
  icon,
  onPress,
  style,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {opacity: pressed ? 0.88 : 1},
        style,
      ]}>
      <View style={styles.iconWrap}>{icon}</View>
      <CustomText style={styles.label} numberOfLines={1}>
        {label}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.socialButtonBorder,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    gap: SPACING.xs,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.darkGray,
    flexShrink: 1,
  },
});

export default AuthSocialLoginButton;
