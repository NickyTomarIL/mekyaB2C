import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import COLORS from '@/constants/colors';
import { fontFamilies } from '@/constants/fonts';

export interface CommonActionableButtonProps {
  handleClick: () => void;
  label?: string;
  lable?: string;
  icon?: React.ReactNode;
  width?: DimensionValue;
  height?: number;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

const CommonActionableButton: React.FC<CommonActionableButtonProps> = ({
  handleClick,
  label,
  lable,
  icon,
  width = '100%',
  height = 34,
  disabled = false,
  containerStyle,
  labelStyle,
}) => {
  const displayLabel = label ?? lable ?? '';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={displayLabel}
      disabled={disabled}
      onPress={handleClick}
      style={({pressed}) => [
        styles.button,
        {
          width,
          height,
          opacity: pressed || disabled ? 0.8 : 1,
          backgroundColor: disabled ? COLORS.disabled : COLORS.splash,
        },
        containerStyle,
      ]}>
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      <Text style={[styles.label, labelStyle]}>{displayLabel}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.splash,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontFamily: fontFamilies.medium,
    color: COLORS.white,
    fontSize: 16,
  },
});

export default CommonActionableButton;
