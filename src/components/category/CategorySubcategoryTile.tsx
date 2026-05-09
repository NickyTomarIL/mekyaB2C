import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CategorySubcategoryTileProps {
  label: string;
  onPress?: () => void;
}

const CategorySubcategoryTile: React.FC<CategorySubcategoryTileProps> = ({
  label,
  onPress,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress ?? (() => undefined)}
      style={({pressed}) => [styles.wrap, pressed ? styles.pressed : null]}>
      <View style={styles.circle}>
        <Ionicons name="image-outline" size={26} color={COLORS.textMuted} />
      </View>
      <CustomText numberOfLines={2} style={styles.label}>
        {label}
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '33.333%',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
  },
  pressed: {
    opacity: 0.85,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default React.memo(CategorySubcategoryTile);
