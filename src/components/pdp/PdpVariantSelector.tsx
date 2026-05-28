import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import type {PdpColorOption, PdpSizeOption} from '@/data/pdpFeed';
import React, {useMemo} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type PdpVariantSelectorProps = {
  colors: ReadonlyArray<PdpColorOption>;
  sizes: ReadonlyArray<PdpSizeOption>;
  selectedColorId: string;
  selectedSizeId: string;
  onSelectColor: (colorId: string) => void;
  onSelectSize: (sizeId: string) => void;
  onPressSizeGuide?: () => void;
};

const PdpVariantSelector: React.FC<PdpVariantSelectorProps> = ({
  colors,
  sizes,
  selectedColorId,
  selectedSizeId,
  onSelectColor,
  onSelectSize,
  onPressSizeGuide,
}) => {
  const selectedColorName = useMemo(
    () => colors.find(c => c.id === selectedColorId)?.name ?? '',
    [colors, selectedColorId],
  );
  const selectedSizeLabel = useMemo(
    () => sizes.find(s => s.id === selectedSizeId)?.label ?? '',
    [sizes, selectedSizeId],
  );

  return (
    <View style={styles.container}>
      <CustomText style={styles.variantLabel}>
        Color: <CustomText style={styles.variantValue}>{selectedColorName}</CustomText>
      </CustomText>
      <View style={styles.colorRow}>
        {colors.map(color => {
          const isSelected = color.id === selectedColorId;
          return (
            <Pressable
              key={color.id}
              accessibilityRole="button"
              accessibilityLabel={`Select ${color.name} color`}
              onPress={() => onSelectColor(color.id)}
              style={({pressed}) => [
                styles.colorOuter,
                isSelected && styles.colorOuterSelected,
                pressed && styles.pressed,
              ]}>
              <View
                style={[
                  styles.colorDot,
                  {backgroundColor: color.hex},
                  color.hex === '#FFFFFF' && styles.colorDotWhite,
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sizeHeaderRow}>
        <CustomText style={styles.variantLabel}>
          Size: <CustomText style={styles.variantValue}>{selectedSizeLabel}</CustomText>
        </CustomText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open size guide"
          onPress={onPressSizeGuide}>
          <CustomText style={styles.sizeGuide}>Size Guide</CustomText>
        </Pressable>
      </View>

      <View style={styles.sizeRow}>
        {sizes.map(size => {
          const isSelected = size.id === selectedSizeId;
          return (
            <Pressable
              key={size.id}
              accessibilityRole="button"
              accessibilityLabel={`Select size ${size.label}`}
              onPress={() => onSelectSize(size.id)}
              style={({pressed}) => [
                styles.sizeChip,
                isSelected && styles.sizeChipSelected,
                pressed && styles.pressed,
              ]}>
              <CustomText
                style={[styles.sizeLabel, isSelected && styles.sizeLabelSelected]}>
                {size.label}
              </CustomText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
  },
  variantLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.darkGray,
  },
  variantValue: {
    fontFamily: fontFamilies.medium,
    color: COLORS.black,
  },
  colorRow: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  colorOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOuterSelected: {
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  colorDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  colorDotWhite: {
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
  },
  sizeHeaderRow: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sizeGuide: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  sizeRow: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  sizeChip: {
    minWidth: 44,
    height: 36,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
  },
  sizeChipSelected: {
    borderWidth: 2,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  sizeLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  sizeLabelSelected: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(PdpVariantSelector);
