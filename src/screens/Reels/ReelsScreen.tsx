import CustomText from '@/components/common/CustomText';
import LinkedProductCard from '@/components/product/LinkedProductCard';
import {ReelPreviewCard} from '@/components/reels';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {FRESH_FINDS_ITEMS, SPOTLIGHT_REEL_ITEMS} from '@/data/homeDiscoverFeed';
import {STYLE_STORY_BRANDS} from '@/data/reelsDiscoverFeed';
import {SPACING} from '@/theme/spacing';
import React, {useMemo} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const ReelsScreen: React.FC = () => {
  const {width: screenWidth} = useWindowDimensions();

  const freshFindsCardWidth = useMemo(() => {
    const horizontalPad = SPACING.lg * 2;
    const available = screenWidth - horizontalPad;
    return Math.min(176, Math.round(available * 0.52));
  }, [screenWidth]);

  const spotlightCardWidth = useMemo(() => {
    const horizontalPad = SPACING.lg * 2;
    const available = screenWidth - horizontalPad;
    return Math.min(200, Math.round(available * 0.42));
  }, [screenWidth]);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces>
        <View style={styles.section}>
          <CustomText style={styles.sectionTitleLeft}>
            Your Style, Your Story
          </CustomText>
          <FlatList
            horizontal
            data={STYLE_STORY_BRANDS}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandList}
            renderItem={({item}) => (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open ${item.name}`}
                style={({pressed}) => [
                  styles.brandItem,
                  pressed && styles.pressed,
                ]}>
                <View style={styles.brandLogoRing}>
                  <Image
                    source={item.logo}
                    style={styles.brandLogoImage}
                    resizeMode="cover"
                  />
                </View>
                <CustomText style={styles.brandName} numberOfLines={2}>
                  {item.name}
                </CustomText>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.rowHeader}>
            <CustomText style={styles.spotlightSectionTitle}>
              In The Spotlight
            </CustomText>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel="See all reels in the spotlight"
              style={({pressed}) => [
                styles.seeAllRow,
                pressed && styles.pressed,
              ]}>
              <CustomText style={styles.seeAllText}>See all</CustomText>
              <Ionicons
                name="arrow-up-outline"
                size={16}
                color={COLORS.splash}
                style={styles.seeAllIcon}
              />
            </Pressable>
          </View>
          <FlatList
            horizontal
            data={SPOTLIGHT_REEL_ITEMS}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.spotlightList}
            renderItem={({item}) => (
              <View style={styles.spotlightCardWrap}>
                <ReelPreviewCard
                  variant="homePreview"
                  cardWidth={spotlightCardWidth}
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

        <View style={styles.section}>
          <CustomText style={styles.sectionTitleLeft}>Fresh Finds</CustomText>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const BRAND_LOGO_SIZE = 50;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl + SPACING.lg,
  },
  section: {
    marginVertical: SPACING.xl,
  },
  sectionTitleLeft: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xxl,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  spotlightSectionTitle: {
    flex: 1,
    marginRight: SPACING.md,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  seeAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.black,
    textDecorationLine: 'underline',
  },
  seeAllIcon: {
    marginLeft: SPACING.xs,
    transform: [{rotate: '45deg'}],
  },
  brandList: {
    paddingHorizontal: SPACING.lg,
    paddingRight: SPACING.xl,
    gap: SPACING.lg,
  },
  brandItem: {
    alignItems: 'center',
    width: BRAND_LOGO_SIZE + 30 ,
    marginRight: SPACING.xs,
    justifyContent: 'center',
  },
  brandLogoRing: {
    width: BRAND_LOGO_SIZE,
    height: BRAND_LOGO_SIZE,
    borderRadius: BRAND_LOGO_SIZE / 2,
    overflow: 'hidden',
  },
  brandLogoImage: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    marginTop: SPACING.sm,
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    lineHeight: 14,
    color: COLORS.black,
    textAlign: 'center',
  },
  spotlightList: {
    paddingHorizontal: SPACING.lg,
    paddingRight: SPACING.xl,
  },
  spotlightCardWrap: {
    marginRight: SPACING.md,
  },
  freshFindsList: {
    paddingHorizontal: SPACING.lg,
    paddingRight: SPACING.xl,
  },
  pressed: {
    opacity: 0.65,
  },
});

export default ReelsScreen;
