import COLORS from '@/constants/colors';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle} from 'react-native';

export interface AuthScreenCardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * White sheet with rounded top corners — wraps primary auth form content.
 */
const AuthScreenCard: React.FC<AuthScreenCardProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxxl,
    flexGrow: 1,
  },
});

export default AuthScreenCard;
