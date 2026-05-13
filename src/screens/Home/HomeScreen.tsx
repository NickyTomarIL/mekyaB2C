import {MekyaLogo, MekyaLogoAuth} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useCallback, useMemo, useState} from 'react';
import {
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

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 40;

const HERO_IMAGE = require('@/assets/images/homeBanner.png');

const LOGO_MARK_SIZE = 32;

const HERO_SLIDES: ReadonlyArray<{title: string; subtitle: string}> = [
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

  const heroHeight = useMemo(
    () => Math.min(200, Math.round(screenWidth * 1.12)),
    [screenWidth],
  );

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
              style={({pressed}) => [styles.iconHit, pressed && styles.pressed]}>
              <Ionicons
                name="search-outline"
                size={24}
                color={COLORS.darkGray}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Wishlist"
              hitSlop={12}
              style={({pressed}) => [styles.iconHit, pressed && styles.pressed]}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={COLORS.darkGray}
              />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Notifications"
              hitSlop={12}
              style={({pressed}) => [styles.iconHit, pressed && styles.pressed]}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={COLORS.darkGray}
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.heroWrap, {height: heroHeight}]}>
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
                style={[styles.heroSlide, {width: screenWidth, height: heroHeight}]}
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
                      style={({pressed}) => [
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
                      style={({pressed}) => [
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
              style={({pressed}) => [
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
    paddingVertical: SPACING.md,
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
    paddingHorizontal:16,
    paddingVertical:3
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
});

export default HomeScreen;
