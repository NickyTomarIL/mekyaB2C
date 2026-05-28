import {HeartIcon, SearchIcon} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import HeaderActionGroup, {
  type HeaderActionItem,
} from '@/components/common/HeaderActionGroup';
import LinkedProductCard from '@/components/product/LinkedProductCard';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {RootStackParamList} from '@/navigation/types';
import {PLP_HERO_BANNERS, PLP_PRODUCTS} from '@/data/plpFeed';
import {SPACING} from '@/theme/spacing';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
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

const PLPScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'ProductListing'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductListing'>>();
  const {width: screenWidth} = useWindowDimensions();
  const [heroIndex, setHeroIndex] = useState(0);
  const heroScrollRef = useRef<ScrollView>(null);

  const cardWidth = useMemo(() => {
    const horizontalPadding = SPACING.lg * 2;
    const gap = SPACING.md;
    const available = screenWidth - horizontalPadding - gap;
    return Math.max(120, Math.floor(available / 2));
  }, [screenWidth]);

  const heroWidth = useMemo(() => {
    return screenWidth;
  }, [screenWidth]);

  const heroHeight = useMemo(() => Math.round(heroWidth * 0.58), [heroWidth]);

  const onHeroMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const next = Math.round(offsetX / heroWidth);
      const clamped = Math.min(Math.max(0, next), PLP_HERO_BANNERS.length - 1);
      setHeroIndex(clamped);
    },
    [heroWidth],
  );

  const scrollHeroTo = useCallback(
    (nextIndex: number) => {
      const clamped = Math.min(
        Math.max(0, nextIndex),
        PLP_HERO_BANNERS.length - 1,
      );
      heroScrollRef.current?.scrollTo({
        x: clamped * heroWidth,
        y: 0,
        animated: true,
      });
      setHeroIndex(clamped);
    },
    [heroWidth],
  );

  const title = route.params?.title ?? 'Product listing';

  const headerActions = useMemo<HeaderActionItem[]>(
    () => [
      {
        id: 'search',
        accessibilityLabel: 'Search',
        icon: <SearchIcon />,
        onPress: () => undefined,
      },
      {
        id: 'wishlist',
        accessibilityLabel: 'Wishlist',
        icon: <HeartIcon />,
        onPress: () => undefined,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={({pressed}) => [styles.backButton, pressed && styles.pressed]}>
          <Ionicons name="chevron-back" size={20} color={COLORS.black} />
        </Pressable>
        <View style={styles.headerTitleWrap}>
          <CustomText style={styles.headerTitle}>{title}</CustomText>
          {/* <CustomText style={styles.headerSubtitle}>
            {PLP_PRODUCTS.length} products
          </CustomText> */}
        </View>
        <HeaderActionGroup
          items={headerActions}
          showCartIcon
          onCartPress={() => navigation.navigate('Main', {screen: 'Cart'})}
        />
      </View>
      {/* <View style={styles.headerDivider} /> */}

      <FlatList
        data={PLP_PRODUCTS}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrap}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={[styles.heroCarouselWrap, {height: heroHeight}]}>
              <ScrollView
                ref={heroScrollRef}
                horizontal
                pagingEnabled
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onHeroMomentumEnd}
                accessibilityLabel="PLP promotional carousel">
                {PLP_HERO_BANNERS.map(banner => (
                  <ImageBackground
                    key={banner.id}
                    source={banner.image}
                    resizeMode="cover"
                    style={[styles.heroSlide, {width: heroWidth, height: heroHeight}]}>
                  </ImageBackground>
                ))}
              </ScrollView>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous banner"
                onPress={() => scrollHeroTo(heroIndex - 1)}
                style={({pressed}) => [styles.heroNavLeft, pressed && styles.pressed]}>
                <Ionicons name="chevron-back" size={18} color={COLORS.white} />
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next banner"
                onPress={() => scrollHeroTo(heroIndex + 1)}
                style={({pressed}) => [styles.heroNavRight, pressed && styles.pressed]}>
                <Ionicons name="chevron-forward" size={18} color={COLORS.white} />
              </Pressable>
            </View>

            <View style={styles.heroDotsRow} pointerEvents="none">
              {PLP_HERO_BANNERS.map((_, i) => (
                <View
                  key={`plp-hero-dot-${i}`}
                  style={[
                    styles.heroDot,
                    i === heroIndex ? styles.heroDotActive : styles.heroDotInactive,
                  ]}
                />
              ))}
            </View>

            <View style={styles.filterSortBar}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Filter products"
                style={({pressed}) => [
                  styles.filterSortAction,
                  pressed && styles.pressed,
                ]}>
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={COLORS.black}
                  style={styles.filterSortIcon}
                />
                <CustomText style={styles.filterSortText}>Filter</CustomText>
              </Pressable>

              <View style={styles.filterSortDivider} />

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Sort products"
                style={({pressed}) => [
                  styles.filterSortAction,
                  pressed && styles.pressed,
                ]}>
                <Ionicons
                  name="swap-vertical-outline"
                  size={20}
                  color={COLORS.black}
                  style={styles.filterSortIcon}
                />
                <CustomText style={styles.filterSortText}>Sort</CustomText>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({item}) => (
          <LinkedProductCard showQuickAdd={false} actionButtonsMode="cartAndBuy" item={item} cardWidth={cardWidth} variant="grid" />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    flex: 1,
    marginLeft: SPACING.sm,
    marginRight: SPACING.sm,
  },
  headerTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 18,
    color: COLORS.black,
    textTransform: 'capitalize',
  },
  headerSubtitle: {
    marginTop: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  headerDivider: {
    height: 1,
    backgroundColor: COLORS.extraLightGray,
  },
  listHeader: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  heroCarouselWrap: {
    marginHorizontal: -SPACING.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.extraLightGray,
    position: 'relative',
  },
  heroSlide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTopLeftText: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    fontFamily: fontFamilies.medium,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 0.6,
    color: COLORS.white,
  },
  heroTopRightText: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    textAlign: 'right',
    fontFamily: fontFamilies.medium,
    fontSize: 8,
    lineHeight: 11,
    letterSpacing: 0.6,
    color: COLORS.white,
  },
  heroCenterCopy: {
    alignItems: 'center',
  },
  heroCenterTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 20,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  heroCenterSubtitle: {
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.white,
    letterSpacing: 0.7,
  },
  heroNavLeft: {
    position: 'absolute',
    left: SPACING.sm,
    top: '50%',
    marginTop: -16,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.splash,
    borderRadius: 10,
  },
  heroNavRight: {
    position: 'absolute',
    right: SPACING.sm,
    top: '50%',
    marginTop: -16,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.splash,
    borderRadius: 10,
  },
  heroDotsRow: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  heroDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  heroDotActive: {
    backgroundColor: COLORS.splash,
  },
  heroDotInactive: {
    backgroundColor: COLORS.disabled,
  },
  filterSortBar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.extraLightGray,
    backgroundColor: COLORS.white,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -SPACING.lg,
  },
  filterSortAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSortIcon: {
    marginRight: SPACING.sm,
  },
  filterSortText: {
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  filterSortDivider: {
    width: 1,
    height: '100%',
    backgroundColor: COLORS.extraLightGray,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.massive,
  },
  columnWrap: {
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default PLPScreen;
