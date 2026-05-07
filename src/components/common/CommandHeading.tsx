import { fontFamilies } from '@/constants/fonts';
import React from 'react';
import {StyleSheet, Text, type StyleProp, type TextStyle} from 'react-native';

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
    <Text numberOfLines={numberOfLines} style={[styles.heading, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
  },
});

export default CommonBoldHeading;
