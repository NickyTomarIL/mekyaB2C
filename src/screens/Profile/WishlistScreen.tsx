import CustomText from '@/components/common/CustomText';
import WishlistItemCard, {
  type WishlistItemData,
} from '@/components/profile/WishlistItemCard';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MOCK_WISHLIST_ITEMS: WishlistItemData[] = [
  {
    id: 'wishlist-1',
    title: 'Round Neck Long Sleeve Fitted Knit Topscd',
    subtitle: '🕶️🌗 +5 more',
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    seller: 'The Workshop Studio',
    stockLabel: 'In stock',
  },
  {
    id: 'wishlist-2',
    title: 'Round Neck Long Sleeve Fitted Knit Topscd',
    subtitle: '🕶️🌗 +5 more',
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    seller: 'The Workshop Studio',
    stockLabel: 'In stock',
  },
  {
    id: 'wishlist-3',
    title: 'Round Neck Long Sleeve Fitted Knit Topscd',
    subtitle: '🕶️🌗 +5 more',
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    seller: 'The Workshop Studio',
    stockLabel: 'In stock',
  },
  {
    id: 'wishlist-4',
    title: 'Round Neck Long Sleeve Fitted Knit Topscd',
    subtitle: '🕶️🌗 +5 more',
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    seller: 'The Workshop Studio',
    stockLabel: 'In stock',
  },
];

const WishlistScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <CustomText style={styles.headerTitle}>Added items</CustomText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Shop more"
          onPress={() => undefined}
          style={({pressed}) => [styles.shopMoreRow, pressed ? styles.pressed : null]}>
          <CustomText style={styles.shopMoreText}>Shop more</CustomText>
          <Ionicons name="arrow-up-outline" size={16} color={COLORS.splash} />
        </Pressable>
      </View>

      <View style={styles.headerDivider} />

      <FlatList
        data={MOCK_WISHLIST_ITEMS}
        numColumns={2}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <WishlistItemCard
            item={item}
            onAddToCart={() => undefined}
            onRemove={() => undefined}
            onToggleFavorite={() => undefined}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 32 / 2.1,
    color: COLORS.black,
  },
  shopMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  shopMoreText: {
    fontFamily: fontFamilies.medium,
    fontSize: 16 / 1.2,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    marginBottom: SPACING.lg,
  },
  listContent: {
    paddingBottom: SPACING.xxl,
  },
  columnWrap: {
    justifyContent: 'space-between',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default WishlistScreen;
