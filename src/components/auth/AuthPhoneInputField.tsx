import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

export interface AuthPhoneInputFieldProps
  extends Omit<TextInputProps, 'style' | 'value' | 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  countryCode?: string;
  countryFlag?: string;
  onCountryPress?: () => void;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthPhoneInputField: React.FC<AuthPhoneInputFieldProps> = ({
  value,
  onChangeText,
  countryCode = '+91',
  countryFlag = '🇮🇳',
  onCountryPress,
  placeholder = 'Enter 10-digit phone number',
  height = 52,
  containerStyle,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.wrapper,
        isFocused ? styles.wrapperFocused : null,
        {height},
        containerStyle,
      ]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Select country code"
        onPress={onCountryPress}
        style={({pressed}) => [
          styles.countryPressable,
          {opacity: pressed ? 0.75 : 1},
        ]}>
        <Text style={styles.flag}>{countryFlag}</Text>
        <Text style={styles.chevron}>▼</Text>
      </Pressable>

      <View style={styles.separator} />

      <View style={styles.phoneField}>
        <Text style={styles.countryCode}>{countryCode}</Text>
        <Text style={styles.countryCodeSeparator}>{' |'}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.disabled}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          autoCorrect={false}
          autoCapitalize="none"
          style={styles.input}
          onFocus={event => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          accessibilityLabel="Mobile number"
          {...textInputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: SPACING.lg,
  },
  wrapperFocused: {
    borderColor: COLORS.black,
  },
  countryPressable: {
    width: 96,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  flag: {
    fontSize: 20,
  },
  chevron: {
    fontSize: 11,
    color: COLORS.black,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.borderInput,
  },
  phoneField: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingLeft: SPACING.lg,
  },
  input: {
    flex: 1,
    // height: '100%',
    marginLeft: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  countryCode: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  countryCodeSeparator:{
    fontSize:18,
    fontFamily: fontFamilies.regular,
  }
});

export default AuthPhoneInputField;
