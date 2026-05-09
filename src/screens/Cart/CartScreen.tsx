import {CartEmpty} from '@/assets/icons';
import CartCheckoutStepper from '@/components/cart/CartCheckoutStepper';
import CartDeliverySection from '@/components/cart/CartDeliverySection';
import CartLineItemCard from '@/components/cart/CartLineItemCard';
import CartPriceSummary from '@/components/cart/CartPriceSummary';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {CartLineItem, CartPriceBreakdown} from '@/screens/Cart/cartTypes';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const MOCK_ITEMS: CartLineItem[] = [
  {
    id: 'cart-1',
    brand: 'Louis Philippe Sport',
    description: 'Men Pure Cotton Slim Fit Casual Shirt',
    priceLabel: '₹549',
    mrpLabel: '₹849',
    discountLabel: '(10% off)',
    size: 'XL',
    qty: 1,
  },
  {
    id: 'cart-2',
    brand: 'Louis Philippe Sport',
    description: 'Men Pure Cotton Slim Fit Casual Shirt',
    priceLabel: '₹549',
    mrpLabel: '₹849',
    discountLabel: '(10% off)',
    size: 'XL',
    qty: 1,
  },
  {
    id: 'cart-3',
    brand: 'Louis Philippe Sport',
    description: 'Men Pure Cotton Slim Fit Casual Shirt',
    priceLabel: '₹549',
    mrpLabel: '₹849',
    discountLabel: '(10% off)',
    size: 'XL',
    qty: 1,
  },
];

const MOCK_PRICE: CartPriceBreakdown = {
  itemCount: 3,
  totalMrp: '₹2,547',
  discountOnMrp: '₹1,647',
  couponDiscount: '0',
  shippingCharges: '₹120',
  totalAmount: '₹1,767',
};

const CartScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<CartLineItem[]>(MOCK_ITEMS);

  const priceBreakdown = useMemo((): CartPriceBreakdown => {
    const count = items.length;
    if (count === 0) {
      return {
        itemCount: 0,
        totalMrp: '₹0',
        discountOnMrp: '₹0',
        couponDiscount: '0',
        shippingCharges: '₹0',
        totalAmount: '₹0',
      };
    }
    return {...MOCK_PRICE, itemCount: count};
  }, [items.length]);

  const handleRemove = useCallback((id: string) => {
    setItems(prev => prev.filter(line => line.id !== id));
  }, []);

  const handleSaveForLater = useCallback((_id: string) => {
    // Hook for wishlist / saved API
  }, []);

  const footerBottomPad = Math.max(insets.bottom, SPACING.lg);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <CustomText style={styles.screenTitle}>Your Cart</CustomText>
        {items.length > 0 ? <CartCheckoutStepper activeStep="bag" /> : null}

        {items.length === 0 ? (
          <View style={styles.emptyWrap}>
            <CartEmpty width={220} height={220} />
            <CustomText style={styles.emptyTitle}>Your cart is empty</CustomText>
            <CustomText style={styles.emptySubtitle}>
              Add items from the shop to see them here.
            </CustomText>
          </View>
        ) : (
          <View style={styles.listGap}>
            {items.map((item, index) => (
              <View key={item.id} style={index > 0 ? styles.cardSpacer : undefined}>
                <CartLineItemCard
                  item={item}
                  onRemove={handleRemove}
                  onSaveForLater={handleSaveForLater}
                  onPressSize={() => undefined}
                  onPressQty={() => undefined}
                />
              </View>
            ))}
          </View>
        )}

        {items.length > 0 ? (
          <>
            <CartDeliverySection onCheckPincode={() => undefined} />
            <CartPriceSummary breakdown={priceBreakdown} />
          </>
        ) : null}
      </ScrollView>

      {items.length > 0 ? (
        <View style={[styles.footer, {paddingBottom: footerBottomPad}]}>
          <CommonActionableButton
            handleClick={() => undefined}
            label="Place order"
            height={52}
            containerStyle={styles.placeOrderBtn}
            labelStyle={styles.placeOrderLabel}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  screenTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  listGap: {
    marginBottom: SPACING.sm,
  },
  cardSpacer: {
    marginTop: SPACING.lg,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    color: COLORS.black,
    marginTop: SPACING.lg,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  placeOrderBtn: {
    borderRadius: 8,
  },
  placeOrderLabel: {
    fontSize: 16,
    fontFamily: fontFamilies.semiBold,
  },
});

export default CartScreen;
