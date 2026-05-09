import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {ProfileOrder} from '@/screens/Profile/profileOrderTypes';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OrderHistoryCardProps {
  order: ProfileOrder;
  onViewDetails?: (orderId: string) => void;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({order, onViewDetails}) => {
  return (
    <View style={styles.card}>
      <View style={styles.metaRow}>
        <View style={styles.metaBlock}>
          <CustomText style={styles.metaLabel}>Order Number</CustomText>
          <CustomText style={styles.metaValue}>#{order.orderNumber}</CustomText>
        </View>
        <View style={styles.metaBlock}>
          <CustomText style={styles.metaLabel}>Purchased on</CustomText>
          <CustomText style={styles.metaValue}>{order.purchasedOn}</CustomText>
        </View>
      </View>

      <View style={styles.itemRow}>
        <View style={styles.productImage}>
          <Ionicons name="person-outline" size={34} color={COLORS.black} />
        </View>
        <View style={styles.itemInfo}>
          <CustomText numberOfLines={1} style={styles.productName}>
            {order.productName}
          </CustomText>
          <CustomText numberOfLines={1} style={styles.brandName}>
            {order.productBrand}
          </CustomText>
          <View style={styles.attributeRow}>
            <CustomText style={styles.attributeText}>Color: {order.color}</CustomText>
            <CustomText style={styles.attributeText}>Size: {order.size}</CustomText>
            <CustomText style={styles.attributeText}>Qty:{order.qty}</CustomText>
          </View>
          <View style={styles.bottomRow}>
            <CustomText style={styles.priceText}>Price : {order.price}</CustomText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`View details for order ${order.orderNumber}`}
              onPress={() => onViewDetails?.(order.id)}
              style={({pressed}) => [pressed ? styles.linkPressed : null]}>
              <CustomText style={styles.linkText}>View details</CustomText>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.statusRow}>
        <CustomText style={styles.statusLabel}>Status</CustomText>
        <CustomText
          style={[
            styles.statusValue,
            order.statusTone === 'success' ? styles.statusSuccess : styles.statusNeutral,
          ]}>
          {order.statusLabel}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F4F8F9',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  metaBlock: {
    flex: 1,
  },
  metaLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.validationColor,
    marginBottom: SPACING.sm,
  },
  metaValue: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 32 / 2,
    color: COLORS.black,
  },
  itemRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  productImage: {
    width: 106,
    height: 106,
    borderRadius: 4,
    backgroundColor: '#E3C86D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: fontFamilies.medium,
    fontSize: 16 / 1.1,
    color: COLORS.black,
    marginBottom: 2,
  },
  brandName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  attributeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.md,
  },
  attributeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 31 / 2.3,
    color: COLORS.validationColor,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontFamily: fontFamilies.medium,
    fontSize: 18 / 1.1,
    color: COLORS.darkGray,
  },
  linkText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15 / 1.2,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  linkPressed: {
    opacity: 0.7,
  },
  statusRow: {
    borderTopWidth: 1,
    borderTopColor: '#F4F4F4',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 31 / 2.1,
    color: COLORS.validationColor,
  },
  statusValue: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 17 / 1.1,
  },
  statusSuccess: {
    color: '#278C03',
  },
  statusNeutral: {
    color: COLORS.black,
  },
});

export default React.memo(OrderHistoryCard);
