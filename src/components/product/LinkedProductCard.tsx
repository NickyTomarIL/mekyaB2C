import CustomText from '@/components/common/CustomText';
import LinkedProductColorSwatches from '@/components/product/LinkedProductColorSwatches';
import LinkedProductRating from '@/components/product/LinkedProductRating';
import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DISCOUNT_GREEN = '#15803d';

interface LinkedProductCardProps {
  item: LinkedProductItem;
  cardWidth: number;
  /** When false, hides the Quick add row (e.g. Fresh Finds layout). Default true. */
  showQuickAdd?: boolean;
  onQuickAdd?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onPressMoreColors?: (id: string) => void;
}

const LinkedProductCard: React.FC<LinkedProductCardProps> = ({
  item,
  cardWidth,
  showQuickAdd = true,
  onQuickAdd,
  onToggleFavorite,
  onPressMoreColors,
}) => {
  return (
    <View style={[styles.card, {width: cardWidth}]}>
      <View style={styles.imageWrap}>
        {item.imageSource ? (
          <Image
            source={item.imageSource}
            style={styles.productImage}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <Ionicons name="shirt-outline" size={48} color={COLORS.textMuted} />
        )}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Save ${item.title} to wishlist`}
          onPress={() => onToggleFavorite?.(item.id)}
          style={({pressed}) => [styles.favoriteBtn, pressed ? styles.pressed : null]}>
          <Ionicons name="heart-outline" size={16} color={COLORS.black} />
        </Pressable>
      </View>

      <CustomText numberOfLines={2} style={styles.title}>
        {item.title}
      </CustomText>

      <LinkedProductColorSwatches
        colors={item.swatchColors}
        moreCount={item.moreColorsCount}
        onPressMore={() => onPressMoreColors?.(item.id)}
      />

      <View style={styles.priceRow}>
        <CustomText style={styles.price}>{item.price}</CustomText>
        <CustomText style={styles.mrp}>{item.mrp}</CustomText>
        <CustomText style={styles.discount}>{item.discount}</CustomText>
      </View>

      <LinkedProductRating ratingLabel={item.rating} />

      {item.brandName ? (
        <CustomText style={styles.brandName} numberOfLines={1}>
          {item.brandName}
        </CustomText>
      ) : null}

      {showQuickAdd ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Quick add ${item.title} to cart`}
          onPress={() => onQuickAdd?.(item.id)}
          style={({pressed}) => [styles.quickAdd, pressed ? styles.pressed : null]}>
          <CustomText style={styles.quickAddText}>Quick add</CustomText>
          <Ionicons name="cart-outline" size={16} color={COLORS.white} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: SPACING.md,
  },
  imageWrap: {
    height: 160,
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  productImage: {
    ...StyleSheet.absoluteFill,
    borderRadius: 4,
    height: '100%',
    width: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  price: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  mrp: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: DISCOUNT_GREEN,
  },
  brandName: {
    fontFamily: fontFamilies.bold,
    fontSize: 10,
    color: COLORS.black,
    textDecorationLine: 'underline',
    marginTop: -SPACING.xs,
  },
  quickAdd: {
    backgroundColor: COLORS.splash,
    borderRadius: 6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  quickAddText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.82,
  },
});

export default React.memo(LinkedProductCard);
