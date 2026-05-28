import {HeartIcon, SearchIcon} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import HeaderActionGroup, {
  type HeaderActionItem,
} from '@/components/common/HeaderActionGroup';
import PdpAccordionGroup from '@/components/pdp/PdpAccordionGroup';
import PdpBreadcrumbs from '@/components/pdp/PdpBreadcrumbs';
import PdpFeatureStrip from '@/components/pdp/PdpFeatureStrip';
import PdpFulfillmentBlock from '@/components/pdp/PdpFulfillmentBlock';
import PdpImageGallery from '@/components/pdp/PdpImageGallery';
import PdpPriceBlock from '@/components/pdp/PdpPriceBlock';
import PdpReviewsSection from '@/components/pdp/PdpReviewsSection';
import PdpSizeChartModal from '@/components/pdp/PdpSizeChartModal';
import PdpVariantSelector from '@/components/pdp/PdpVariantSelector';
import LinkedProduct from '@/components/product/LinkedProduct';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {
  PDP_BREADCRUMBS,
  PDP_COLOR_OPTIONS,
  PDP_DEFAULT_SELECTIONS,
  PDP_DELIVERY_NOTE,
  PDP_DELIVERY_ZIP,
  PDP_DETAILS_ACCORDIONS,
  PDP_FEATURE_BADGES,
  PDP_GALLERY_IMAGES,
  PDP_PEOPLE_ALSO_BOUGHT,
  PDP_PICKUP_LABEL,
  PDP_PRIMARY_PRODUCT,
  PDP_RATING_BREAKDOWN,
  PDP_RATING_SUMMARY,
  PDP_REVIEW_PAGE_COUNT,
  PDP_REVIEW_SORT_OPTIONS,
  PDP_REVIEWS,
  PDP_SIZE_OPTIONS,
  PDP_YOU_MAY_ALSO_LIKE,
  type PdpReviewSortOption,
} from '@/data/pdpFeed';
import {useNavigateToProductDetail} from '@/navigation/useNavigateToProductDetail';
import type {RootStackParamList} from '@/navigation/types';
import {SPACING} from '@/theme/spacing';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

const PDPScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedColorId, setSelectedColorId] = useState<string>(
    PDP_DEFAULT_SELECTIONS.colorId,
  );
  const [selectedSizeId, setSelectedSizeId] = useState<string>(
    PDP_DEFAULT_SELECTIONS.sizeId,
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewSort, setReviewSort] = useState<PdpReviewSortOption>(
    PDP_REVIEW_SORT_OPTIONS[0],
  );
  const [sizeChartVisible, setSizeChartVisible] = useState(false);

  const navigateToProductDetail = useNavigateToProductDetail();

  const headerActions = useMemo<HeaderActionItem[]>(
    () => [
      {
        id: 'search',
        accessibilityLabel: 'Search',
        icon: <SearchIcon />,
        onPress: () => navigation.navigate('Search'),
      },
      {
        id: 'wishlist',
        accessibilityLabel: 'Wishlist',
        icon: <HeartIcon />,
      },
    ],
    [navigation],
  );

  const cycleReviewSort = () => {
    const currentIndex = PDP_REVIEW_SORT_OPTIONS.indexOf(reviewSort);
    const nextIndex = (currentIndex + 1) % PDP_REVIEW_SORT_OPTIONS.length;
    setReviewSort(PDP_REVIEW_SORT_OPTIONS[nextIndex] ?? PDP_REVIEW_SORT_OPTIONS[0]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={({pressed}) => [styles.backBtn, pressed && styles.pressed]}>
          <Ionicons name="chevron-back" size={22} color={COLORS.black} />
        </Pressable>
        <View style={styles.headerSpacer} />
        <HeaderActionGroup
          items={headerActions}
          showCartIcon
          onCartPress={() => navigation.navigate('Main', {screen: 'Cart'})}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: Math.max(insets.bottom, SPACING.massive)},
        ]}
        showsVerticalScrollIndicator={false}>
        <PdpBreadcrumbs items={PDP_BREADCRUMBS} />

        <PdpImageGallery
          images={PDP_GALLERY_IMAGES}
          isWishlisted={isWishlisted}
          onToggleWishlist={() => setIsWishlisted(v => !v)}
        />

        <View style={styles.content}>
          <CustomText style={styles.brand}>{PDP_PRIMARY_PRODUCT.brand}</CustomText>
          <CustomText style={styles.title}>{PDP_PRIMARY_PRODUCT.title}</CustomText>

          <PdpPriceBlock
            price={PDP_PRIMARY_PRODUCT.price}
            mrp={PDP_PRIMARY_PRODUCT.mrp}
            discount={PDP_PRIMARY_PRODUCT.discount}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${PDP_PRIMARY_PRODUCT.ratingCountLabel} reviews`}
            style={({pressed}) => [styles.ratingRow, pressed && styles.pressed]}>
            <View style={styles.starsRow}>
              {Array.from({length: 5}).map((_, index) => (
                <Ionicons
                  key={`product-star-${index}`}
                  name={
                    index < Math.floor(Number(PDP_PRIMARY_PRODUCT.ratingLabel))
                      ? 'star'
                      : 'star-half'
                  }
                  size={14}
                  color={COLORS.orange}
                />
              ))}
            </View>
            <CustomText style={styles.ratingLabel}>
              {PDP_PRIMARY_PRODUCT.ratingLabel}
            </CustomText>
            <CustomText style={styles.ratingCount}>
              {PDP_PRIMARY_PRODUCT.ratingCountLabel}
            </CustomText>
          </Pressable>

          <PdpVariantSelector
            colors={PDP_COLOR_OPTIONS}
            sizes={PDP_SIZE_OPTIONS}
            selectedColorId={selectedColorId}
            selectedSizeId={selectedSizeId}
            onSelectColor={setSelectedColorId}
            onSelectSize={setSelectedSizeId}
            onPressSizeGuide={() => setSizeChartVisible(true)}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add to bag"
            style={({pressed}) => [styles.addToBagBtn, pressed && styles.pressed]}>
            <CustomText style={styles.addToBagText}>Add to Bag</CustomText>
          </Pressable>

          <PdpFulfillmentBlock
            pickupLabel={PDP_PICKUP_LABEL}
            deliveryZip={PDP_DELIVERY_ZIP}
            deliveryNote={PDP_DELIVERY_NOTE}
          />
        </View>

        <PdpFeatureStrip items={PDP_FEATURE_BADGES} />
        <PdpAccordionGroup items={PDP_DETAILS_ACCORDIONS} />

        <LinkedProduct
          title="People also bought"
          items={PDP_PEOPLE_ALSO_BOUGHT}
          contentContainerStyle={styles.linkedSection}
          onPressProduct={productId => navigateToProductDetail(productId, 'pdp')}
        />

        <PdpReviewsSection
          average={PDP_RATING_SUMMARY.average}
          totalRatings={PDP_RATING_SUMMARY.totalRatings}
          breakdown={PDP_RATING_BREAKDOWN}
          reviews={PDP_REVIEWS}
          sortLabel={reviewSort}
          currentPage={reviewPage}
          totalPages={PDP_REVIEW_PAGE_COUNT}
          onPressSort={cycleReviewSort}
          onSelectPage={setReviewPage}
        />

        <LinkedProduct
          title="You may also like"
          items={PDP_YOU_MAY_ALSO_LIKE}
          contentContainerStyle={styles.linkedSectionBottom}
          onPressProduct={productId => navigateToProductDetail(productId, 'pdp')}
        />
      </ScrollView>

      <PdpSizeChartModal
        visible={sizeChartVisible}
        onClose={() => setSizeChartVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    minHeight: 48,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.massive,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  brand: {
    marginTop: SPACING.md,
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    letterSpacing: 0.8,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },
  title: {
    marginTop: SPACING.xs,
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.black,
  },
  ratingRow: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
  ratingLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  ratingCount: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  addToBagBtn: {
    marginTop: SPACING.lg,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.splash,
  },
  addToBagText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
  linkedSection: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  linkedSectionBottom: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PDPScreen;
