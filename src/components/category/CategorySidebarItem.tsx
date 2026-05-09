import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CategorySidebarItemProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const CategorySidebarItem: React.FC<CategorySidebarItemProps> = ({
  label,
  selected,
  onPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{selected}}
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [
        styles.wrap,
        selected ? styles.wrapSelected : null,
        pressed ? styles.pressed : null,
      ]}>
      <View style={[styles.avatar, selected ? styles.avatarSelected : null]}>
        <Ionicons
          name="shirt-outline"
          size={22}
          color={selected ? COLORS.splash : COLORS.lightGray}
        />
      </View>
      <CustomText
        numberOfLines={2}
        style={[styles.label, selected ? styles.labelSelected : styles.labelInactive]}>
        {label}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    marginRight: -1,
  },
  wrapSelected: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 0,
    paddingRight: SPACING.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarSelected: {
    backgroundColor: '#E8F4F8',
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 14,
  },
  labelSelected: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
  },
  labelInactive: {
    fontFamily: fontFamilies.regular,
    color: COLORS.lightGray,
  },
});

export default React.memo(CategorySidebarItem);
