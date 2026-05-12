import CachedImage from '@/components/common/CachedImage';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import { fontFamilies } from '@/constants/fonts';
import type { CartLineItem } from '@/screens/Cart/cartTypes';
import { SPACING } from '@/theme/spacing';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const THUMB_WIDTH = 76;
const THUMB_HEIGHT = 93;

const PLACEHOLDER_THUMB = require('@/assets/images/men2.png');

interface CartLineItemCardProps {
  item: CartLineItem;
  onRemove?: (id: string) => void;
  onSaveForLater?: (id: string) => void;
  onPressSize?: (id: string) => void;
  onPressQty?: (id: string) => void;
}

function formatMrpLabel(mrpLabel: string): string {
  const trimmed = mrpLabel.trim();
  if (trimmed.toLowerCase().startsWith('mrp')) {
    return trimmed;
  }
  return `MRP ${trimmed}`;
}

const CartLineItemCard: React.FC<CartLineItemCardProps> = ({
  item,
  onRemove,
  onSaveForLater,
  onPressSize,
  onPressQty,
}) => {
  const mrpDisplay = formatMrpLabel(item.mrpLabel);
  const thumbSource =
    item.imageUrl && item.imageUrl.trim().length > 0
      ? {uri: item.imageUrl.trim()}
      : PLACEHOLDER_THUMB;

  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <View style={styles.thumb}>
          <CachedImage
            accessibilityRole="image"
            accessibilityLabel={`${item.brand} product image`}
            source={thumbSource}
            style={styles.thumbImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.rightColumn}>
          <CustomText numberOfLines={1} style={styles.brand}>
            {item.brand}
          </CustomText>
          <CustomText numberOfLines={2} style={styles.description}>
            {item.description}
          </CustomText>

          <View style={styles.priceRow}>
            <CustomText style={styles.price}>{item.priceLabel}</CustomText>
            <CustomText style={styles.mrp}>{mrpDisplay}</CustomText>
            <CustomText style={styles.discount}>{item.discountLabel}</CustomText>
          </View>

          <View style={styles.selectorsRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Change size, current ${item.size}`}
              onPress={() => onPressSize?.(item.id)}
              style={({ pressed }) => [styles.selectorChip, pressed ? styles.selectorPressed : null]}>
              <CustomText style={styles.selectorText}>
                <CustomText style={styles.selectorPrefix}>Size : </CustomText>
                <CustomText style={styles.selectorValue}>{item.size}</CustomText>
              </CustomText>
              <Ionicons name="chevron-down" size={16} color={COLORS.black} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Change quantity, current ${item.qty}`}
              onPress={() => onPressQty?.(item.id)}
              style={({ pressed }) => [styles.selectorChip, pressed ? styles.selectorPressed : null]}>
              <CustomText style={styles.selectorText}>
                <CustomText style={styles.selectorPrefix}>Qty : </CustomText>
                <CustomText style={styles.selectorValue}>{String(item.qty)}</CustomText>
              </CustomText>
              <Ionicons name="chevron-down" size={16} color={COLORS.black} />
            </Pressable>
          </View>

        </View>

      </View>
      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.brand} from cart`}
          onPress={() => onRemove?.(item.id)}
          style={({ pressed }) => [styles.actionLink, pressed ? styles.actionPressed : null]}>
          <CustomText style={styles.actionText}>Remove</CustomText>
        </Pressable>
        <CustomText style={styles.actionPipe} accessibilityElementsHidden>
          |
        </CustomText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Save ${item.brand} for later`}
          onPress={() => onSaveForLater?.(item.id)}
          style={({ pressed }) => [styles.actionLink, pressed ? styles.actionPressed : null]}>
          <CustomText style={styles.actionText}>Save for Later</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumb: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
    marginRight: SPACING.md,
    overflow: 'hidden',
  },
  thumbImage: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
    height: THUMB_HEIGHT,
    paddingVertical: SPACING.xs,

  },
  brand: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  description: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.black,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  price: {
    fontFamily: fontFamilies.regular,
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
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.splash,
  },
  selectorsRow: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  selectorChip: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    paddingHorizontal: SPACING.xs,
  },
  selectorPressed: {
    opacity: 0.88,
  },
  selectorText: {
    flex: 1,
    fontSize: 10,
  },
  selectorPrefix: {
    fontSize: 10,
    fontFamily: fontFamilies.medium,
    color: COLORS.black,
  },
  selectorValue: {
    fontSize: 10,
    fontFamily: fontFamilies.medium,
    color: COLORS.black,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  actionLink: {
    paddingVertical: SPACING.xs,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionPipe: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
  },
  actionText: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: COLORS.black,
  },
});

export default React.memo(CartLineItemCard);
