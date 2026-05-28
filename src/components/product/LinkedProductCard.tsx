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
  /** Carousel tiles use right margin; grid omits it and adds bottom margin. */
  variant?: 'default' | 'grid';
  /** When false, hides the Quick add row (e.g. Fresh Finds layout). Default true. */
  showQuickAdd?: boolean;
  /** Controls bottom action row visibility/type. */
  actionButtonsMode?: 'quickAdd' | 'cartAndBuy' | 'none';
  onQuickAdd?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onBuyNow?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onPressMoreColors?: (id: string) => void;
}

const LinkedProductCard: React.FC<LinkedProductCardProps> = ({
  item,
  cardWidth,
  variant = 'default',
  showQuickAdd = true,
  actionButtonsMode,
  onQuickAdd,
  onAddToCart,
  onBuyNow,
  onToggleFavorite,
  onPressMoreColors,
}) => {
  const resolvedActionMode =
    actionButtonsMode ?? (showQuickAdd ? 'quickAdd' : 'none');

  return (
    <View
      style={[
        styles.card,
        variant === 'grid' && styles.cardGrid,
        {width: cardWidth},
      ]}>
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

      {resolvedActionMode === 'quickAdd' ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Quick add ${item.title} to cart`}
          onPress={() => onQuickAdd?.(item.id)}
          style={({pressed}) => [styles.quickAdd, pressed ? styles.pressed : null]}>
          <CustomText style={styles.quickAddText}>Quick add</CustomText>
          <Ionicons name="cart-outline" size={16} color={COLORS.white} />
        </Pressable>
      ) : null}

      {resolvedActionMode === 'cartAndBuy' ? (
        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Add ${item.title} to cart`}
            onPress={() => onAddToCart?.(item.id)}
            style={({pressed}) => [
              styles.actionButton,
              styles.addToCartButton,
              pressed ? styles.pressed : null,
            ]}>
            <CustomText style={[styles.actionButtonText, styles.addToCartText]}>
              Add to Cart
            </CustomText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Buy ${item.title} now`}
            onPress={() => onBuyNow?.(item.id)}
            style={({pressed}) => [
              styles.actionButton,
              styles.buyNowButton,
              pressed ? styles.pressed : null,
            ]}>
            <CustomText style={[styles.actionButtonText, styles.buyNowText]}>
              Buy Now
            </CustomText>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: SPACING.md,
  },
  cardGrid: {
    marginRight: 0,
    marginVertical: SPACING.xl,
  },
  imageWrap: {
    height: 197,
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
    height: 35,
    overflow: 'hidden',
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
  actionRow: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    height: 32,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.splash,
  },
  buyNowButton: {
    backgroundColor: COLORS.splash,
  },
  actionButtonText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  addToCartText: {
    color: COLORS.splash,
  },
  buyNowText: {
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.82,
  },
});

export default React.memo(LinkedProductCard);
