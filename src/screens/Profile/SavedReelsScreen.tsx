import {LinkedProduct, type LinkedProductItem} from '@/components/product';
import {ReelPreviewCard} from '@/components/reels';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BRAND_NAME = 'Allen Solly';

const MOCK_LINKED: LinkedProductItem[] = [
  {
    id: 'lp-1',
    title: 'Round Neck Long Sleeve Fitted Knit...',
    swatchColors: ['#1a1a1a', '#C4A574', '#9CA3AF', '#E8E0D5'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
  },
  {
    id: 'lp-2',
    title: 'Round Neck Long Sleeve Fitted Knit...',
    swatchColors: ['#1a1a1a', '#C4A574', '#9CA3AF', '#E8E0D5'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
  },
  {
    id: 'lp-3',
    title: 'Round Neck Long Sleeve Fitted Knit...',
    swatchColors: ['#1a1a1a', '#C4A574', '#9CA3AF', '#E8E0D5'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
  },
];

const SavedReelsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(true);

  const onPressBrand = useCallback(() => {
    // Navigate to brand / store when wired
  }, []);

  const onDelete = useCallback(() => {
    // Confirm + remove saved reel when wired
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[
        styles.scrollContent,
        {paddingBottom: Math.max(insets.bottom, SPACING.xl)},
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.brandRow}>
        <View style={styles.brandLabelRow}>
          <CustomText style={styles.brandPrefix}>Brand : </CustomText>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel={`Open brand ${BRAND_NAME}`}
            onPress={onPressBrand}
            style={({pressed}) => [pressed ? styles.pressed : null]}>
            <CustomText style={styles.brandLink}>{BRAND_NAME}</CustomText>
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete saved reel"
          onPress={onDelete}
          hitSlop={12}
          style={({pressed}) => [styles.deleteBtn, pressed ? styles.pressed : null]}>
          <Ionicons name="trash-outline" size={22} color="#DC2626" />
        </Pressable>
      </View>

      <View style={styles.reelWrap}>
        <ReelPreviewCard
          creatorName={BRAND_NAME}
          caption="Midweight, Midweight+, Heavyweight which one is your next hoodie grail? ..."
          likeCountLabel="3,566"
          shareCountLabel="290"
          isSaved={saved}
          onPressFollow={() => undefined}
          onPressLike={() => undefined}
          onPressShare={() => undefined}
          onPressSave={() => setSaved(v => !v)}
        />
      </View>

      <LinkedProduct
        items={MOCK_LINKED}
        contentContainerStyle={styles.linkedSection}
        onQuickAdd={() => undefined}
        onToggleFavorite={() => undefined}
        onPressMoreColors={() => undefined}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  brandLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: SPACING.md,
  },
  brandPrefix: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  brandLink: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  deleteBtn: {
    padding: SPACING.xs,
  },
  reelWrap: {
    marginBottom: SPACING.lg,
  },
  linkedSection: {
    paddingHorizontal: 0,
    paddingVertical: SPACING.sm,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default SavedReelsScreen;
