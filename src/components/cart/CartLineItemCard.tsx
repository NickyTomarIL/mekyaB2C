import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {CartLineItem} from '@/screens/Cart/cartTypes';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CartLineItemCardProps {
  item: CartLineItem;
  onRemove?: (id: string) => void;
  onSaveForLater?: (id: string) => void;
  onPressSize?: (id: string) => void;
  onPressQty?: (id: string) => void;
}

const CartLineItemCard: React.FC<CartLineItemCardProps> = ({
  item,
  onRemove,
  onSaveForLater,
  onPressSize,
  onPressQty,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <View style={styles.thumb}>
          <Ionicons name="shirt-outline" size={40} color={COLORS.darkGray} />
        </View>
        <View style={styles.info}>
          <CustomText numberOfLines={1} style={styles.brand}>
            {item.brand}
          </CustomText>
          <CustomText numberOfLines={2} style={styles.description}>
            {item.description}
          </CustomText>
          <View style={styles.priceRow}>
            <CustomText style={styles.price}>{item.priceLabel}</CustomText>
            <CustomText style={styles.mrp}>{item.mrpLabel}</CustomText>
            <CustomText style={styles.discount}>{item.discountLabel}</CustomText>
          </View>
          <View style={styles.selectorsRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Change size, current ${item.size}`}
              onPress={() => onPressSize?.(item.id)}
              style={({pressed}) => [styles.selector, pressed ? styles.selectorPressed : null]}>
              <CustomText style={styles.selectorLabel}>Size</CustomText>
              <View style={styles.selectorValueRow}>
                <CustomText style={styles.selectorValue}>{item.size}</CustomText>
                <Ionicons name="chevron-down" size={16} color={COLORS.black} />
              </View>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Change quantity, current ${item.qty}`}
              onPress={() => onPressQty?.(item.id)}
              style={({pressed}) => [styles.selector, pressed ? styles.selectorPressed : null]}>
              <CustomText style={styles.selectorLabel}>Qty</CustomText>
              <View style={styles.selectorValueRow}>
                <CustomText style={styles.selectorValue}>{String(item.qty)}</CustomText>
                <Ionicons name="chevron-down" size={16} color={COLORS.black} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.brand} from cart`}
          onPress={() => onRemove?.(item.id)}
          style={({pressed}) => [styles.actionBtn, pressed ? styles.actionPressed : null]}>
          <CustomText style={styles.actionText}>Remove</CustomText>
        </Pressable>
        <View style={styles.actionDivider} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Save ${item.brand} for later`}
          onPress={() => onSaveForLater?.(item.id)}
          style={({pressed}) => [styles.actionBtn, pressed ? styles.actionPressed : null]}>
          <CustomText style={styles.actionText}>Save for Later</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumb: {
    width: 88,
    height: 88,
    borderRadius: 6,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  brand: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.black,
    marginBottom: SPACING.xs,
  },
  description: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  priceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  price: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: COLORS.black,
  },
  mrp: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.splash,
  },
  selectorsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 6,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    flex: 1,
    minWidth: 0,
  },
  selectorPressed: {
    opacity: 0.85,
  },
  selectorLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  selectorValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: SPACING.sm,
  },
  selectorValue: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#D1D1D1',
  },
  actionText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.darkGray,
  },
});

export default React.memo(CartLineItemCard);
