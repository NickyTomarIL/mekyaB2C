import COLORS from '@/constants/colors';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface AuthCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  style?: StyleProp<ViewStyle>;
  /** Larger touch target around the box only */
  testID?: string;
}

const BOX = 20;

const AuthCheckbox: React.FC<AuthCheckboxProps> = ({
  checked,
  onToggle,
  style,
  testID,
}) => {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="checkbox"
      accessibilityState={{checked}}
      onPress={onToggle}
      style={({pressed}) => [
        styles.hitArea,
        {opacity: pressed ? 0.85 : 1},
        style,
      ]}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? (
          <Ionicons name="checkmark" size={14} color={COLORS.white} />
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  hitArea: {
    padding: SPACING.xs,
    margin: -SPACING.xs,
  },
  box: {
    width: BOX,
    height: BOX,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: COLORS.splash,
    borderColor: COLORS.splash,
  },
});

export default AuthCheckbox;
