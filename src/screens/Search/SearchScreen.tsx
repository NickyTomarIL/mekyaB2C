import {SearchIcon} from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {RECENT_SEARCHES, TRENDING_SEARCHES} from '@/data/searchDiscoverFeed';
import type {MainTabParamList} from '@/navigation/types';
import {RADIUS, SPACING} from '@/theme';
import {useNavigation} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList, 'Search'>>();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSuggestionPress = useCallback(() => undefined, []);

  const renderSuggestionRow = useCallback(
    ({
      id,
      label,
      leftIconName,
    }: {
      id: string;
      label: string;
      leftIconName: 'time-outline' | 'search-outline';
    }) => (
      <Pressable
        key={id}
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={handleSuggestionPress}
        style={({pressed}) => [styles.suggestionRow, pressed && styles.pressed]}>
        <View style={styles.suggestionLeft}>
          <Ionicons
            name={leftIconName}
            size={20}
            color={COLORS.darkGray}
            style={styles.leadingIcon}
          />
          <CustomText style={styles.suggestionLabel}>{label}</CustomText>
        </View>
        <Ionicons
          name="arrow-up-outline"
          size={20}
          color={COLORS.darkGray}
          style={styles.trailingIcon}
        />
      </Pressable>
    ),
    [handleSuggestionPress],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.searchHeader}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={handleBackPress}
          style={({pressed}) => [styles.backButton, pressed && styles.pressed]}>
          <Ionicons name="chevron-back" size={24} color={COLORS.black} />
        </Pressable>
        <View style={styles.searchInputContainer}>
          <TextInput
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder='Search "brands"'
            placeholderTextColor={COLORS.textMuted}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          <SearchIcon width={18} height={18} />
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          {RECENT_SEARCHES.map(item =>
            renderSuggestionRow({
              id: item.id,
              label: item.label,
              leftIconName: 'time-outline',
            }),
          )}
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>Trending</CustomText>
          {TRENDING_SEARCHES.map(item =>
            renderSuggestionRow({
              id: item.id,
              label: item.label,
              leftIconName: 'search-outline',
            }),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  backButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.black,
    paddingVertical: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  section: {
    paddingTop: SPACING.xs,
  },
  sectionTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.lightGray,
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  suggestionRow: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suggestionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SPACING.md,
  },
  leadingIcon: {
    width: 20,
    textAlign: 'center',
  },
  suggestionLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.darkGray,
  },
  trailingIcon: {
    transform: [{rotate: '45deg'}],
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.extraLightGray,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default SearchScreen;
