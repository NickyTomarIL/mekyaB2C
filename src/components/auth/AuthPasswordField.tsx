import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {EyeCloseIcon, EyeOpenIcon} from '@/assets/icons';
import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';

export interface AuthPasswordFieldProps
  extends Omit<TextInputProps, 'style' | 'secureTextEntry'> {
  value: string;
  onChangeText: (text: string) => void;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthPasswordField: React.FC<AuthPasswordFieldProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter password',
  height = 52,
  containerStyle,
  ...textInputProps
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.wrapper, {height}, containerStyle]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.disabled}
        secureTextEntry={!visible}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        accessibilityLabel="Password"
        {...textInputProps}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={visible ? 'Hide password' : 'Show password'}
        onPress={() => setVisible(v => !v)}
        style={({pressed}) => [styles.eye, {opacity: pressed ? 0.6 : 1}]}>
        {visible ? (
          <EyeCloseIcon width={22} height={22} />
        ) : (
          <EyeOpenIcon width={22} height={22} />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.black,
    paddingVertical: 0,
    includeFontPadding: false,
    height: '100%',
  },
  eye: {
    padding: 4,
    marginLeft: 8,
  },
});

export default AuthPasswordField;
