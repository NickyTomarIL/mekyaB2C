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

export interface CommandActionableButtonProps {
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

const CommandActionableButton: React.FC<CommandActionableButtonProps> = ({
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CommandActionableButton;
