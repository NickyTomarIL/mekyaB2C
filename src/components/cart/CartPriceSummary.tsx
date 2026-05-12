import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {CartPriceBreakdown} from '@/screens/Cart/cartTypes';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface CartPriceSummaryProps {
  breakdown: CartPriceBreakdown;
}

interface RowProps {
  label: string;
  value: string;
  valueBold?: boolean;
}

const SummaryRow: React.FC<RowProps> = ({label, value, valueBold}) => (
  <View style={styles.row}>
    <CustomText style={styles.rowLabel}>{label}</CustomText>
    <CustomText style={[styles.rowValue, valueBold ? styles.rowValueBold : null]}>{value}</CustomText>
  </View>
);

const CartPriceSummary: React.FC<CartPriceSummaryProps> = ({breakdown}) => {
  return (
    <View style={styles.section}>
      <CustomText style={styles.title}>Price Details ({breakdown.itemCount} items)</CustomText>
      <View style={styles.rows}>
        <SummaryRow label="Total MRP" value={breakdown.totalMrp} />
        <SummaryRow label="Discount on MRP" value={breakdown.discountOnMrp} />
        <SummaryRow label="Coupon Discount" value={breakdown.couponDiscount} />
        <SummaryRow label="Shipping Charges" value={breakdown.shippingCharges} />
      </View>
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <CustomText style={styles.totalLabel}>Total Amount</CustomText>
        <CustomText style={styles.totalValue}>{breakdown.totalAmount}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  title: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  rows: {
    gap: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  rowValue: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  rowValueBold: {
    fontFamily: fontFamilies.bold,
  },
  divider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: SPACING.lg,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  totalValue: {
    fontFamily: fontFamilies.medium,
    fontSize: 18,
    color: COLORS.black,
  },
});

export default React.memo(CartPriceSummary);
