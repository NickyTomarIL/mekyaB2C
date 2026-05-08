import { fontFamilies } from '@/constants/fonts';
import React from 'react';
import {StyleSheet, type StyleProp, type TextStyle} from 'react-native';
import CustomText from './CustomText';

export interface CommonBoldHeadingProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

const CommonBoldHeading: React.FC<CommonBoldHeadingProps> = ({
  children,
  style,
  numberOfLines,
}) => {
  return (
    <CustomText numberOfLines={numberOfLines} style={[styles.heading, style]}>
      {children}
    </CustomText>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: fontFamilies.heading,
    fontWeight: '700',
    fontSize: 26,
  },
});

export default CommonBoldHeading;
