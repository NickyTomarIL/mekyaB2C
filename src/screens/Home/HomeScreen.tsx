import {
  HeartIcon,
  MekyaLogoAuth,
  SearchIcon,
  WellIcon,
} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import HeaderActionGroup, {
  type HeaderActionItem,
} from '@/components/common/HeaderActionGroup';
import BrandBanner from '@/components/brand/BrandBanner';
import LinkedProductCard from '@/components/product/LinkedProductCard';
import {ReelPreviewCard} from '@/components/reels';
import COLORS from '@/constants/colors';
import {
  FEATURED_CATEGORIES,
  FRESH_FINDS_ITEMS,
  HERO_SLIDES,
  JACKET_GRID_ITEMS,
  NEW_FALL_HERO_IMAGE,
  NEW_FALL_TOP_IMAGES,
  SPOTLIGHT_REEL_ITEMS,
} from '@/data/homeDiscoverFeed';
import {fontFamilies} from '@/constants/fonts';
import type {RootStackParamList} from '@/navigation/types';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useId, useMemo, useState} from 'react';
import {useNavigation, type CompositeNavigationProp} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  ImageBackground,
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
import type {MainTabParamList} from '@/navigation/types';

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 40;

const HERO_IMAGE = require('@/assets/images/homeBanner.png');

const HomeScreen: React.FC = () => {
  type HomeScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
  const navigation = useNavigation<HomeScreenNavigationProp>();
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

  /** Explicit size avoids flex+aspectRatio + absolute Image layout bugs (esp. Android). */
  const newFallTopTileLayout = useMemo(() => {
    const sectionPad = SPACING.lg * 2;
    const inner = screenWidth - sectionPad;
    const gap = SPACING.md;
    const tileW = Math.max(1, Math.floor((inner - gap * 2) / 3));
    const tileH = Math.round((tileW * 4) / 3);
    return {width: tileW, height: tileH};
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

  const navigateToProductListing = useCallback(
    (source: 'fresh-finds' | 'brand-banner') => {
      navigation.navigate('ProductListing', {
        source,
        title: 'All products',
      });
    },
    [navigation],
  );

  const navigateToSearch = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const headerActions = useMemo<HeaderActionItem[]>(
    () => [
      {
        id: 'search',
        accessibilityLabel: 'Search',
        icon: (
          <SearchIcon
            // width={HEADER_ICON_SIZE}
            // height={HEADER_ICON_SIZE}
            // color={COLORS.black}
          />
        ),
        onPress: navigateToSearch,
      },
      {
        id: 'wishlist',
        accessibilityLabel: 'Wishlist',
        icon: (
          <HeartIcon
            // width={HEADER_ICON_SIZE}
            // height={HEADER_ICON_SIZE}
            // color={COLORS.black}
          />
        ),
        onPress: () => undefined,
      },
      {
        id: 'notifications',
        accessibilityLabel: 'Notifications',
        icon: (
          <WellIcon
            // width={HEADER_ICON_SIZE}
            // height={HEADER_ICON_SIZE}
            // color={COLORS.black}
          />
        ),
        onPress: () => undefined,
      },
    ],
    [navigateToSearch],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <View style={styles.screenBody}>
        <View style={styles.header}>
          <MekyaLogoAuth width={LOGO_WIDTH} height={LOGO_HEIGHT} />
          <HeaderActionGroup
            items={headerActions}
            
            onCartPress={() => navigation.navigate('Cart')}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          bounces
          nestedScrollEnabled>
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
              onPress={() => navigateToProductListing('fresh-finds')}
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
          onPress={() => navigateToProductListing('brand-banner')}
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
            data={SPOTLIGHT_REEL_ITEMS}
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
                  style={[
                    styles.newFallTopCell,
                    {
                      width: newFallTopTileLayout.width,
                      height: newFallTopTileLayout.height,
                    },
                  ]}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  screenBody: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
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
    // borderRadius: 4,
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
    marginTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  freshFindsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
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
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  jacketGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  watchWearSection: {
    marginTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  watchWearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
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
    fontFamily: fontFamilies.regular,
    fontSize: 18,
    fontStyle: 'italic',
    color: COLORS.black,
    marginBottom: SPACING.xl,
  },
  newFallTitle: {
    marginTop: SPACING.sm,
    textAlign: 'center',
    fontFamily: fontFamilies.regular,
    fontSize: 20,
    lineHeight: 30,
    color: COLORS.mediumGray,
    paddingHorizontal: SPACING.sm,
    alignSelf: 'center',
    maxWidth: '80%',
    marginBottom: SPACING.xxl,
  },
  newFallGrid: {
    marginTop: SPACING.lg,
  },
  newFallTopRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  newFallTopCell: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.extraLightGray,
  },
  newFallTopImage: {
    width: '100%',
    height: '100%',
  },
  newFallHero: {
    marginTop: SPACING.md,
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.extraLightGray,
  },
  newFallHeroImageRadius: {
    borderRadius: 4,
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
    backgroundColor: '#EEEEEE',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm + 2,
    borderRadius: 4,
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
