import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';

export interface CustomTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({children, style, ...rest}) => {
  return (
    <RNText style={[styles.baseText, style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  baseText: {
    color: COLORS.darkGray,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    includeFontPadding: false,
  },
});

export default React.memo(CustomText);
