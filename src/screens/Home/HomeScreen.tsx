import {
  HeartIcon,
  MekyaLogoAuth,
  SearchIcon,
  WellIcon,
} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import BrandBanner from '@/components/brand/BrandBanner';
import LinkedProductCard from '@/components/product/LinkedProductCard';
import {ReelPreviewCard} from '@/components/reels';
import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useId, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  type ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const HEADER_ICON_SIZE = 24;

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 40;

const HERO_IMAGE = require('@/assets/images/homeBanner.png');

const FRESH_FINDS_ITEMS: LinkedProductItem[] = [
  {
    id: 'fresh-1',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/girl1.jpg'),
  },
  {
    id: 'fresh-2',
    title: 'Pure Cotton Slim Fit Casual Shirt',
    swatchColors: ['#2563eb', '#1a1a1a', '#78716c'],
    moreColorsCount: 3,
    price: '₹649',
    mrp: 'MRP ₹899',
    discount: '(8% off)',
    rating: '4.8',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/girl2.jpg'),
  },
  {
    id: 'fresh-3',
    title: 'Relaxed Fit Organic Cotton Hoodie',
    swatchColors: ['#365314', '#d4d4d4', '#171717'],
    moreColorsCount: 4,
    price: '₹899',
    mrp: 'MRP ₹1,199',
    discount: '(12% off)',
    rating: '4.9',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/girl3.jpg'),
  },
];

/** Four tiles in a 2×2 grid (project has jacket1–3.png; fourth reuses jacket1). */
const JACKET_GRID_ITEMS: LinkedProductItem[] = [
  {
    id: 'jacket-grid-1',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket1.png'),
  },
  {
    id: 'jacket-grid-2',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket2.png'),
  },
  {
    id: 'jacket-grid-3',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket3.png'),
  },
  {
    id: 'jacket-grid-4',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket1.png'),
  },
];

type WatchWearItem = {
  id: string;
  thumbnail: ImageSourcePropType;
  creatorName: string;
  caption: string;
};

/** New Fall Collection: top row + full-width hero (season assets). */
const NEW_FALL_TOP_IMAGES: ReadonlyArray<ImageSourcePropType> = [
  require('@/assets/images/seasonImage1.jpg'),
  require('@/assets/images/seasonImage2.jpg'),
  require('@/assets/images/seasonImage3.jpg'),
];
const NEW_FALL_HERO_IMAGE = require('@/assets/images/seasonImage4.jpg');

const WATCH_WEAR_ITEMS: WatchWearItem[] = [
  {
    id: 'ww-1',
    thumbnail: require('@/assets/images/seasonImage1.jpg'),
    creatorName: 'Allen Solly',
    caption:
      'Midweight, Midweight+, Heavyweight — which one is your next hoodie grail?',
  },
  {
    id: 'ww-2',
    thumbnail: require('@/assets/images/seasonImage2.jpg'),
    creatorName: 'H&M',
    caption: 'Winter layers that move with you — shop the edit.',
  },
  {
    id: 'ww-3',
    thumbnail: require('@/assets/images/seasonImage3.jpg'),
    creatorName: 'The Workshop Studio',
    caption: 'Coats worth the double-take. Tap to watch the full reel.',
  },
];

const HERO_SLIDES: ReadonlyArray<{ title: string; subtitle: string }> = [
  {
    title: 'Make An Entrance',
    subtitle: 'Be the best-dressed person in every room you enter',
  },
  {
    title: 'New Arrivals',
    subtitle: 'Fresh styles for the season ahead',
  },
  {
    title: 'Sustainable Style',
    subtitle: 'Thoughtfully made pieces you can feel good in',
  },
];

const FEATURED_CATEGORIES: ReadonlyArray<{
  id: string;
  title: string;
  cta: string;
  image: ImageSourcePropType;
}> = [
    {
      id: 'cashmere',
      title: 'Recycled Cashmere',
      cta: 'Shop Women',
      image: require('@/assets/images/girl1.jpg'),
    },
    {
      id: 'coats',
      title: 'Coats & Jackets',
      cta: 'Shop Men',
      image: require('@/assets/images/girl2.jpg'),
    },
    {
      id: 'hoodies',
      title: 'Organic Cotton Hoodies',
      cta: 'Shop Now',
      image: require('@/assets/images/girl3.jpg'),
    },
  ];

const HomeScreen: React.FC = () => {
  const {width: screenWidth} = useWindowDimensions();
  const [heroIndex, setHeroIndex] = useState(0);
  const newFallHeroGradientId = `newFallHeroFade_${useId().replace(/:/g, '')}`;

  const heroHeight = useMemo(
    () => Math.min(200, Math.round(screenWidth * 1.12)),
    [screenWidth],
  );

  const freshFindsCardWidth = useMemo(() => {
    const horizontalPad = SPACING.lg * 2;
    const available = screenWidth - horizontalPad;
    return Math.min(176, Math.round(available * 0.52));
  }, [screenWidth]);

  const jacketGridCardWidth = useMemo(() => {
    const horizontalPad = SPACING.lg * 2;
    const columnGap = SPACING.md;
    const inner = screenWidth - horizontalPad;
    return Math.max(0, Math.floor((inner - columnGap) / 2));
  }, [screenWidth]);

  const watchWearCardWidth = useMemo(() => {
    const horizontalPad = SPACING.lg * 2;
    const available = screenWidth - horizontalPad;
    return Math.min(200, Math.round(available * 0.42));
  }, [screenWidth]);

  const onHeroMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const next = Math.round(offsetX / screenWidth);
      const clamped = Math.min(
        Math.max(0, next),
        HERO_SLIDES.length - 1,
      );
      setHeroIndex(clamped);
    },
    [screenWidth],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces>
        <View style={styles.header}>
          <MekyaLogoAuth width={LOGO_WIDTH} height={LOGO_HEIGHT} />
          <View style={styles.headerActions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Search"
              hitSlop={12}
              style={({ pressed }) => [styles.iconHit, pressed && styles.pressed]}>
              <SearchIcon
                width={HEADER_ICON_SIZE}
                height={HEADER_ICON_SIZE}
                color={COLORS.black}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Wishlist"
              hitSlop={12}
              style={({ pressed }) => [styles.iconHit, pressed && styles.pressed]}>
              <HeartIcon
                width={HEADER_ICON_SIZE}
                height={HEADER_ICON_SIZE}
                color={COLORS.black}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              hitSlop={12}
              style={({ pressed }) => [styles.iconHit, pressed && styles.pressed]}>
              <WellIcon
                width={HEADER_ICON_SIZE}
                height={HEADER_ICON_SIZE}
                color={COLORS.black}
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.heroWrap, { height: heroHeight }]}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            onMomentumScrollEnd={onHeroMomentumEnd}
            accessibilityLabel="Promotional banners">
            {HERO_SLIDES.map(slide => (
              <ImageBackground
                key={slide.title}
                source={HERO_IMAGE}
                style={[styles.heroSlide, { width: screenWidth, height: heroHeight }]}
                resizeMode="cover"
                accessibilityIgnoresInvertColors>
                <View style={styles.heroTextBlock}>
                  <CustomText style={styles.heroTitle}>{slide.title}</CustomText>
                  <CustomText style={styles.heroSubtitle}>
                    {slide.subtitle}
                  </CustomText>
                  <View style={styles.heroActions}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Shop men"
                      style={({ pressed }) => [
                        styles.heroOutlineBtn,
                        pressed && styles.pressed,
                      ]}>
                      <CustomText style={styles.heroOutlineBtnLabel}>
                        Shop Men
                      </CustomText>
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Shop women"
                      style={({ pressed }) => [
                        styles.heroOutlineBtn,
                        pressed && styles.pressed,
                      ]}>
                      <CustomText style={styles.heroOutlineBtnLabel}>
                        Shop Women
                      </CustomText>
                    </Pressable>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
          <View style={styles.dotsRow} pointerEvents="none">
            {HERO_SLIDES.map((_, i) => (
              <View
                key={`dot-${i}`}
                style={[
                  styles.dot,
                  i === heroIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.featuredRow}>
          {FEATURED_CATEGORIES.map(item => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`${item.title}. ${item.cta}`}
              style={({ pressed }) => [
                styles.categoryCard,
                pressed && styles.pressed,
              ]}>
              <ImageBackground
                source={item.image}
                style={styles.categoryImage}
                imageStyle={styles.categoryImageRadius}
                resizeMode="cover">
                <Svg
                  pointerEvents="none"
                  style={StyleSheet.absoluteFill}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none">
                  <Defs>
                    <LinearGradient
                      id={`homeCatFooterFade_${item.id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                      gradientUnits="objectBoundingBox">
                      <Stop offset="0.5" stopColor="#000000" stopOpacity={0} />
                      <Stop offset="1" stopColor="#000000" stopOpacity={0.78} />
                    </LinearGradient>
                  </Defs>
                  <Rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill={`url(#homeCatFooterFade_${item.id})`}
                  />
                </Svg>
                <View style={styles.categoryFooter}>
                  <CustomText style={styles.categoryTitle}>{item.title}</CustomText>
                  <View style={styles.categoryCta}>
                    <CustomText style={styles.categoryCtaLabel}>{item.cta}</CustomText>
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          ))}
        </View>

        <View style={styles.freshFindsSection}>
          <View style={styles.freshFindsHeader}>
            <CustomText style={styles.freshFindsTitle}>Fresh Finds</CustomText>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="Explore all products"
              style={({pressed}) => [
                styles.exploreAllRow,
                pressed && styles.pressed,
              ]}>
              <CustomText style={styles.exploreAllText}>
                Explore all products
              </CustomText>
              <Ionicons
                name="arrow-up-outline"
                size={16}
                color={COLORS.splash}
                style={styles.exploreAllIcon}
              />
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={FRESH_FINDS_ITEMS}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.freshFindsList}
            renderItem={({item}) => (
              <LinkedProductCard
                item={item}
                cardWidth={freshFindsCardWidth}
                showQuickAdd={false}
              />
            )}
          />
        </View>

        <BrandBanner
          imageSource={require('@/assets/images/men3.png')}
          title="H&M Winter essentials"
          ctaLabel="Explore all products"
        />

        <View style={styles.jacketGridSection}>
          <View style={styles.jacketGrid}>
            {JACKET_GRID_ITEMS.map(item => (
              <LinkedProductCard
                key={item.id}
                item={item}
                cardWidth={jacketGridCardWidth}
                variant="grid"
                showQuickAdd={false}
              />
            ))}
          </View>
        </View>

        <View style={styles.watchWearSection}>
          <View style={styles.watchWearHeader}>
            <CustomText style={styles.watchWearTitle}>Watch & Wear</CustomText>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="See all watch and wear reels"
              style={({pressed}) => [
                styles.exploreAllRow,
                pressed && styles.pressed,
              ]}>
              <CustomText style={styles.exploreAllText}>See all</CustomText>
              <Ionicons
                name="arrow-up-outline"
                size={16}
                color={COLORS.splash}
                style={styles.exploreAllIcon}
              />
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={WATCH_WEAR_ITEMS}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.watchWearList}
            renderItem={({item}) => (
              <View style={styles.watchWearCardWrap}>
                <ReelPreviewCard
                  variant="homePreview"
                  cardWidth={watchWearCardWidth}
                  creatorName={item.creatorName}
                  caption={item.caption}
                  likeCountLabel=""
                  shareCountLabel=""
                  media={
                    <Image
                      source={item.thumbnail}
                      style={StyleSheet.absoluteFill}
                      resizeMode="cover"
                    />
                  }
                  onPressPlay={() => undefined}
                />
              </View>
            )}
          />
        </View>

        <View style={styles.newFallSection}>
          <CustomText style={styles.newFallEyebrow}>New Fall Collection</CustomText>
          <CustomText style={styles.newFallTitle}>
            Step Into the Season with United Colors of Benetton
          </CustomText>

          <View style={styles.newFallGrid}>
            <View style={styles.newFallTopRow}>
              {NEW_FALL_TOP_IMAGES.map((source, index) => (
                <View
                  key={`new-fall-top-${index}`}
                  style={styles.newFallTopCell}>
                  <Image
                    source={source}
                    style={styles.newFallTopImage}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>

            <ImageBackground
              source={NEW_FALL_HERO_IMAGE}
              style={styles.newFallHero}
              imageStyle={styles.newFallHeroImageRadius}
              resizeMode="cover">
              <Svg
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
                width="100%"
                height="100%"
                preserveAspectRatio="none">
                <Defs>
                  <LinearGradient
                    id={newFallHeroGradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    gradientUnits="objectBoundingBox">
                    <Stop offset="0.4" stopColor="#000000" stopOpacity={0} />
                    <Stop offset="1" stopColor="#000000" stopOpacity={0.72} />
                  </LinearGradient>
                </Defs>
                <Rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill={`url(#${newFallHeroGradientId})`}
                />
              </Svg>
              <View style={styles.newFallHeroFooter}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Shop New Fall Collection"
                  style={({pressed}) => [
                    styles.newFallCta,
                    pressed && styles.pressed,
                  ]}>
                  <CustomText style={styles.newFallCtaLabel}>Shop Now</CustomText>
                  <Ionicons
                    name="arrow-up-outline"
                    size={16}
                    color={COLORS.black}
                    style={styles.newFallCtaIcon}
                  />
                </Pressable>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl + SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  wordmark: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 20,
    color: COLORS.splash,
    textTransform: 'lowercase',
    letterSpacing: 0.2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconHit: {
    padding: SPACING.xs,

  },
  pressed: {
    opacity: 0.65,
  },
  heroWrap: {
    position: 'relative',
    width: '100%',
  },
  heroSlide: {
    justifyContent: 'flex-start',
  },
  heroTextBlock: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    maxWidth: '50%',
    paddingTop: SPACING.xl,
    paddingRight: SPACING.lg,
    paddingLeft: SPACING.sm,
  },
  heroTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.splash,

  },
  heroSubtitle: {
    marginTop: SPACING.sm,
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    lineHeight: 16,
    color: COLORS.splash,
    textAlign: 'center',

  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  heroOutlineBtn: {
    borderWidth: 1,
    borderColor: COLORS.splash,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 3
  },
  heroOutlineBtnLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 8,
    color: COLORS.splash,
  },
  dotsRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: COLORS.splash,
  },
  dotInactive: {
    backgroundColor: COLORS.extraLightGray,
  },
  featuredRow: {
    flexDirection: 'row',

  },
  categoryCard: {
    flex: 1,
    minWidth: 0,
    height: 200,
    overflow: 'hidden',
  },
  categoryImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  categoryImageRadius: {
    // borderRadius: 8,
  },

  categoryFooter: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  categoryTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 10,
    lineHeight: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  categoryCta: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    // paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  categoryCtaLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.black,
  },
  freshFindsSection: {
    marginTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  freshFindsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  freshFindsTitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  exploreAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreAllText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  exploreAllIcon: {
    marginLeft: SPACING.xs,
    transform: [{rotate: '45deg'}],
  },
  freshFindsList: {
    paddingHorizontal: SPACING.lg,
    paddingRight: SPACING.xl,
  },
  jacketGridSection: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  jacketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  watchWearSection: {
    marginTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  watchWearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  watchWearTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    color: COLORS.black,
  },
  watchWearList: {
    paddingHorizontal: SPACING.lg,
    paddingRight: SPACING.xl,
  },
  watchWearCardWrap: {
    marginRight: SPACING.md,
  },
  newFallSection: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  newFallEyebrow: {
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.black,
  },
  newFallTitle: {
    marginTop: SPACING.sm,
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.black,
    paddingHorizontal: SPACING.sm,
  },
  newFallGrid: {
    marginTop: SPACING.lg,
  },
  newFallTopRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  newFallTopCell: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.extraLightGray,
  },
  newFallTopImage: {
    ...StyleSheet.absoluteFill,
  },
  newFallHero: {
    marginTop: SPACING.md,
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.extraLightGray,
  },
  newFallHeroImageRadius: {
    borderRadius: 12,
  },
  newFallHeroFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  newFallCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 8,
  },
  newFallCtaLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.black,
  },
  newFallCtaIcon: {
    marginLeft: SPACING.xs,
    transform: [{rotate: '45deg'}],
  },
});

export default HomeScreen;
