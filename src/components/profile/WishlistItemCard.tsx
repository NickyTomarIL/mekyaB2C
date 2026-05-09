import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface WishlistItemData {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  mrp: string;
  discount: string;
  rating: string;
  seller: string;
  stockLabel: string;
}

interface WishlistItemCardProps {
  item: WishlistItemData;
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const WishlistItemCard: React.FC<WishlistItemCardProps> = ({
  item,
  onRemove,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Ionicons name="person-outline" size={56} color={COLORS.darkGray} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.title} from wishlist`}
          onPress={() => onToggleFavorite?.(item.id)}
          style={({pressed}) => [styles.favoriteBtn, pressed ? styles.pressed : null]}>
          <Ionicons name="heart-outline" size={16} color={COLORS.black} />
        </Pressable>
      </View>

      <CustomText numberOfLines={2} style={styles.title}>
        {item.title}
      </CustomText>
      <CustomText numberOfLines={1} style={styles.subtitle}>
        {item.subtitle}
      </CustomText>

      <View style={styles.priceRow}>
        <CustomText style={styles.priceText}>{item.price}</CustomText>
        <CustomText style={styles.mrpText}>{item.mrp}</CustomText>
        <CustomText style={styles.discountText}>{item.discount}</CustomText>
      </View>

      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map(star => (
          <Ionicons
            key={`${item.id}-star-${star}`}
            name="star"
            size={11}
            color={COLORS.orange}
          />
        ))}
        <CustomText style={styles.ratingText}>{item.rating}</CustomText>
      </View>

      <CustomText numberOfLines={1} style={styles.sellerText}>
        {item.seller}
      </CustomText>

      <View style={styles.stockBadge}>
        <CustomText style={styles.stockText}>{item.stockLabel}</CustomText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${item.title}`}
        onPress={() => onRemove?.(item.id)}
        style={({pressed}) => [styles.removeButton, pressed ? styles.pressed : null]}>
        <Ionicons name="trash-outline" size={14} color={COLORS.splash} />
        <CustomText style={styles.removeText}>Remove item</CustomText>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Add ${item.title} to cart`}
        onPress={() => onAddToCart?.(item.id)}
        style={({pressed}) => [styles.cartButton, pressed ? styles.pressed : null]}>
        <Ionicons name="cart-outline" size={14} color={COLORS.white} />
        <CustomText style={styles.cartText}>Add to Cart</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48.5%',
    marginBottom: SPACING.xl,
  },
  imageWrap: {
    height: 186,
    backgroundColor: '#EFEFEF',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  favoriteBtn: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamilies.medium,
    color: COLORS.black,
    fontSize: 15 / 1.15,
    lineHeight: 18,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    color: COLORS.black,
    fontSize: 15 / 1.2,
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: 2,
  },
  priceText: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
    fontSize: 16 / 1.15,
  },
  mrpText: {
    fontFamily: fontFamilies.regular,
    color: COLORS.validationColor,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontFamily: fontFamilies.regular,
    color: COLORS.black,
    fontSize: 11.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
  },
  ratingText: {
    marginLeft: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: COLORS.black,
  },
  sellerText: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
    fontSize: 14 / 1.25,
    textDecorationLine: 'underline',
    marginBottom: SPACING.sm,
  },
  stockBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF4FD',
    borderRadius: 3,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    marginBottom: SPACING.sm,
  },
  stockText: {
    fontFamily: fontFamilies.regular,
    color: COLORS.splash,
    fontSize: 10.5,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: COLORS.splash,
    borderRadius: 4,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  removeText: {
    fontFamily: fontFamilies.regular,
    color: COLORS.splash,
    fontSize: 14 / 1.2,
  },
  cartButton: {
    backgroundColor: COLORS.splash,
    borderRadius: 4,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  cartText: {
    fontFamily: fontFamilies.regular,
    color: COLORS.white,
    fontSize: 14 / 1.2,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(WishlistItemCard);
