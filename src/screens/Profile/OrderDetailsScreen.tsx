import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {ProfileStackParamList} from '@/navigation/types';
import {SPACING} from '@/theme/spacing';
import {useRoute, type RouteProp} from '@react-navigation/native';
import React from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type OrderDetailsRoute = RouteProp<ProfileStackParamList, 'OrderDetails'>;

const TIMELINE_ITEMS = [
  {label: 'Order Placed', date: '20 Jun 2025', time: '12:30 PM', icon: 'bag-outline'},
  {label: 'Shipped', date: '20 Jun 2025', time: '12:30 PM', icon: 'location-outline'},
  {label: 'Delivered', date: '20 Jun 2025', time: '12:30 PM', icon: 'card-outline'},
] as const;

const OrderDetailsScreen: React.FC = () => {
  const route = useRoute<OrderDetailsRoute>();
  const {order} = route.params;

  return (
    <ScrollView
      style={styles.safe}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <View style={styles.headerMeta}>
        <View style={styles.metaRow}>
          <CustomText style={styles.metaLabel}>Order Number :</CustomText>
          <CustomText style={styles.metaValue}>#{order.orderNumber}</CustomText>
        </View>
        <View style={styles.metaRow}>
          <CustomText style={styles.metaLabel}>Placed on :</CustomText>
          <CustomText style={styles.metaValue}>{order.purchasedOn}</CustomText>
        </View>

        <Pressable style={styles.actionRow} accessibilityRole="button">
          <Ionicons name="download-outline" size={18} color={COLORS.black} />
          <CustomText style={styles.actionText}>Download Invoice</CustomText>
        </Pressable>
        <Pressable style={styles.actionRow} accessibilityRole="button">
          <Ionicons name="headset-outline" size={18} color={COLORS.black} />
          <CustomText style={styles.actionText}>Contact Support</CustomText>
        </Pressable>
      </View>

      <View style={styles.timelineCard}>
        <View style={styles.timelineTopRow}>
          {TIMELINE_ITEMS.map(item => (
            <View key={item.label} style={styles.timelineTopItem}>
              <CustomText style={styles.timelineLabel}>{item.label}</CustomText>
            </View>
          ))}
        </View>
        <View style={styles.timelineIconRow}>
          {TIMELINE_ITEMS.map((item, idx) => (
            <View key={item.label} style={styles.timelineIconItem}>
              <View style={[styles.iconCircle, idx === 0 ? styles.iconCirclePrimary : null]}>
                <Ionicons
                  name={item.icon}
                  size={15}
                  color={idx === 0 ? COLORS.white : COLORS.black}
                />
              </View>
              {idx < TIMELINE_ITEMS.length - 1 ? <View style={styles.timelineConnector} /> : null}
            </View>
          ))}
        </View>
        <View style={styles.timelineTopRow}>
          {TIMELINE_ITEMS.map(item => (
            <View key={`${item.label}-time`} style={styles.timelineTopItem}>
              <CustomText style={styles.timelineDate}>{item.date}</CustomText>
              <CustomText style={styles.timelineDate}>{item.time}</CustomText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.productImage}>
            <Ionicons name="person-outline" size={34} color={COLORS.black} />
          </View>
          <View style={styles.itemInfo}>
            <CustomText style={styles.productName} numberOfLines={1}>
              {order.productName}
            </CustomText>
            <CustomText style={styles.brandName}>{order.productBrand}</CustomText>
            <View style={styles.attributeRow}>
              <CustomText style={styles.attributeText}>Color: {order.color}</CustomText>
              <CustomText style={styles.attributeText}>Size: {order.size}</CustomText>
              <CustomText style={styles.attributeText}>Qty:{order.qty}</CustomText>
            </View>
            <CustomText style={styles.priceText}>Price : {order.price}</CustomText>
          </View>
        </View>

        <View style={styles.actionsBottomRow}>
          <CommonActionableButton
            label="Reorder"
            handleClick={() => undefined}
            width={110}
            height={40}
            icon={<Ionicons name="refresh-outline" size={16} color={COLORS.white} />}
            containerStyle={styles.reorderButton}
          />
          <View style={styles.stockBadge}>
            <CustomText style={styles.stockText}>In stock</CustomText>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <CustomText style={styles.sectionTitle}>Price Details (3 items)</CustomText>
        <View style={styles.priceRow}>
          <CustomText style={styles.priceLabel}>Total MRP</CustomText>
          <CustomText style={styles.priceAmount}>₹2,547</CustomText>
        </View>
        <View style={styles.priceRow}>
          <CustomText style={styles.priceLabel}>Discount on MRP</CustomText>
          <CustomText style={styles.priceAmount}>₹1,647</CustomText>
        </View>
        <View style={styles.priceRow}>
          <CustomText style={styles.priceLabel}>Coupon Discount</CustomText>
          <CustomText style={styles.priceAmount}>0</CustomText>
        </View>
        <View style={styles.priceRow}>
          <CustomText style={styles.priceLabel}>Shipping Charges</CustomText>
          <CustomText style={styles.priceAmount}>₹120</CustomText>
        </View>
        <View style={styles.priceDivider} />
        <View style={styles.priceRow}>
          <CustomText style={styles.totalLabel}>Total Amount</CustomText>
          <CustomText style={styles.totalAmount}>₹1,767</CustomText>
        </View>
      </View>

      <View style={styles.card}>
        <CustomText style={styles.sectionTitle}>Delivery Address</CustomText>
        <CustomText style={styles.addressText}>
          Shop No. 12, 2nd Floor Lotus Arcade Shopping Complex, Opposite Trinity Metro
          Station Ashok Nagar, Bengaluru, Karnataka - 560001
        </CustomText>
      </View>

      <View style={styles.card}>
        <CustomText style={styles.sectionTitle}>Payment Method</CustomText>
        <CustomText style={styles.paymentLabel}>Credit Card</CustomText>
        <CustomText style={styles.addressText}>Visa ending : 4242</CustomText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  headerMeta: {
    marginBottom: SPACING.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  metaLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 16 / 1.1,
    color: COLORS.validationColor,
  },
  metaValue: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 16 / 1.1,
    color: COLORS.black,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  actionText: {
    fontFamily: fontFamilies.medium,
    fontSize: 24 / 1.6,
    color: COLORS.black,
  },
  timelineCard: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  timelineTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineTopItem: {
    flex: 1,
  },
  timelineLabel: {
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: 15 / 1.2,
    color: COLORS.darkGray,
  },
  timelineIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SPACING.sm,
  },
  timelineIconItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCirclePrimary: {
    backgroundColor: COLORS.splash,
    borderColor: COLORS.splash,
  },
  timelineConnector: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderInput,
    borderStyle: 'dashed',
    marginHorizontal: SPACING.sm,
  },
  timelineDate: {
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.validationColor,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  itemRow: {
    flexDirection: 'row',
  },
  productImage: {
    width: 96,
    height: 96,
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
  },
  brandName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  attributeRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  attributeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.validationColor,
  },
  priceText: {
    fontFamily: fontFamilies.medium,
    fontSize: 17 / 1.1,
    color: COLORS.darkGray,
  },
  actionsBottomRow: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reorderButton: {
    borderRadius: 6,
  },
  stockBadge: {
    backgroundColor: '#EAF4FD',
    borderRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: 5,
  },
  stockText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.splash,
  },
  sectionTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 30 / 1.5,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  priceLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 16 / 1.1,
    color: COLORS.darkGray,
  },
  priceAmount: {
    fontFamily: fontFamilies.medium,
    fontSize: 16 / 1.1,
    color: COLORS.darkGray,
  },
  priceDivider: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderInput,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18 / 1.1,
    color: COLORS.black,
  },
  totalAmount: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18 / 1.1,
    color: COLORS.black,
  },
  addressText: {
    fontFamily: fontFamilies.regular,
    fontSize: 15 / 1.1,
    color: COLORS.validationColor,
    lineHeight: 22,
  },
  paymentLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 17 / 1.1,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
});

export default OrderDetailsScreen;
