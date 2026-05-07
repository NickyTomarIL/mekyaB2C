import React from 'react';
import {
  StyleSheet,
  Text,
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

export interface CommandInputFieldProps
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'style'> {
  title: string;
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

const CommandInputField: React.FC<CommandInputFieldProps> = ({
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
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, {width}, containerStyle]}>
      <Text style={[styles.label, labelStyle, titleStyle]}>{title}</Text>
      <View style={[styles.inputWrapper, {height}, inputWrapperStyle]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.disabled}
          multiline={false}
          style={[styles.input, inputStyle]}
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
    lineHeight: 24,
    letterSpacing: 0,
    textAlignVertical: 'center',
    marginBottom: 12,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
    height: '100%',
    color: COLORS.black,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default CommandInputField;
