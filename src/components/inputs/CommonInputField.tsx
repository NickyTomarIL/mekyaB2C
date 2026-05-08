import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  type DimensionValue,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {CustomText} from '@/components/common';

export interface CommonInputFieldProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'style'> {
  /** When omitted, only the field is rendered (e.g. placeholder-only auth inputs). */
  title?: string;
  value: string;
  onChangeText: (text: string) => void;
  width?: DimensionValue;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  inputWrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

const CommonInputField: React.FC<CommonInputFieldProps> = ({
  title,
  value,
  onChangeText,
  placeholder = 'Enter your email id',
  width = '100%',
  height = 70,
  containerStyle,
  labelStyle,
  titleStyle,
  inputWrapperStyle,
  inputStyle,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, {width}, containerStyle]}>
      {title ? (
        <CustomText style={[styles.label, labelStyle, titleStyle]}>{title}</CustomText>
      ) : null}
      <View
        style={[
          styles.inputWrapper,
          isFocused ? styles.inputWrapperFocused : null,
          {height},
          inputWrapperStyle,
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.disabled}
          multiline={false}
          style={[styles.input, inputStyle]}
          onFocus={event => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          {...textInputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  label: {
    fontFamily: fontFamilies.regular,
    fontWeight: '400',
    fontStyle: 'normal',
    color: COLORS.black,
    fontSize: 14,
    letterSpacing: 0,
    textAlignVertical: 'center',
    marginBottom: 12,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputWrapperFocused: {
    borderColor: COLORS.black,
  },
  input: {
    fontSize: 14,
    letterSpacing: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: '100%',
    color: COLORS.black,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default CommonInputField;
