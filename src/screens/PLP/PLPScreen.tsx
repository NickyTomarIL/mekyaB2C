import {HeartIcon, SearchIcon} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import HeaderActionGroup, {
  type HeaderActionItem,
} from '@/components/common/HeaderActionGroup';
import LinkedProductCard from '@/components/product/LinkedProductCard';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {RootStackParamList} from '@/navigation/types';
import {PLP_FILTER_CHIPS, PLP_PRODUCTS} from '@/data/plpFeed';
import {SPACING} from '@/theme/spacing';
import {useNavigation, useRoute, type RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {FlatList, Pressable, StyleSheet, View, useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const PLPScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'ProductListing'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ProductListing'>>();
  const {width: screenWidth} = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const horizontalPadding = SPACING.lg * 2;
    const gap = SPACING.md;
    const available = screenWidth - horizontalPadding - gap;
    return Math.max(120, Math.floor(available / 2));
  }, [screenWidth]);

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
      <View style={styles.headerDivider} />

      <FlatList
        data={PLP_PRODUCTS}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrap}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <View style={styles.filterRow}>
              {PLP_FILTER_CHIPS.map(chip => (
                <Pressable
                  key={chip}
                  accessibilityRole="button"
                  accessibilityLabel={`${chip} filter`}
                  style={({pressed}) => [styles.filterChip, pressed && styles.pressed]}>
                  <CustomText style={styles.filterChipText}>{chip}</CustomText>
                </Pressable>
              ))}
            </View>
            <View style={styles.metaRow}>
              <CustomText style={styles.metaText}>
                Showing {PLP_PRODUCTS.length} results
              </CustomText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Sort products"
                style={({pressed}) => [styles.sortButton, pressed && styles.pressed]}>
                <CustomText style={styles.sortText}>Sort: Recommended</CustomText>
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
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    borderRadius: SPACING.massive,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  filterChipText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.black,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  sortButton: {
    paddingVertical: SPACING.xs,
  },
  sortText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.black,
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
