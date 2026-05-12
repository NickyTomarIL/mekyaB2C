import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useMemo, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputKeyPressEventData,
  type ViewStyle,
} from 'react-native';

export interface AuthOtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthOtpInput: React.FC<AuthOtpInputProps> = ({
  value,
  onChange,
  length = 6,
  containerStyle,
}) => {
  const refs = useRef<Array<TextInput | null>>([]);
  const digits = useMemo(() => {
    const normalized = value.replace(/\D/g, '').slice(0, length);
    return Array.from({length}, (_, idx) => normalized[idx] ?? '');
  }, [length, value]);

  const updateDigit = (index: number, text: string): void => {
    const clean = text.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = clean;
    onChange(next.join(''));

    if (clean && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ): void => {
    if (event.nativeEvent.key !== 'Backspace') {
      return;
    }
    if (digits[index] || index === 0) {
      return;
    }
    refs.current[index - 1]?.focus();
  };

  return (
    <View style={[styles.row, containerStyle]}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={input => {
            refs.current[index] = input;
          }}
          value={digit}
          onChangeText={text => updateDigit(index, text)}
          onKeyPress={event => handleKeyPress(index, event)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={1}
          style={styles.box}
          selectTextOnFocus
          accessibilityLabel={`OTP digit ${index + 1}`}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  box: {
    width: 50,
    height: 46,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 4,
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: 22,
    color: COLORS.darkGray,
    backgroundColor: COLORS.white,
  },
});

export default AuthOtpInput;
