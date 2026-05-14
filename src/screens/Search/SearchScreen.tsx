import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * Sample search screen — replace with real search UI and API wiring.
 */
const SearchScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <CustomText style={styles.headerTitle}>Search</CustomText>
      </View>
      <View style={styles.headerDivider} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <CustomText style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat.
        </CustomText>
        <CustomText style={styles.subheading}>Trending searches (dummy)</CustomText>
        <CustomText style={styles.listItem}>
          • Summer linen shirts{'\n'}• Minimal sneakers{'\n'}• Handloom sarees
          {'\n'}• Everyday tote bags
        </CustomText>
        <CustomText style={styles.body}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 18,
    color: COLORS.black,
  },
  headerDivider: {
    height: 1,
    backgroundColor: COLORS.extraLightGray,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  subheading: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    color: COLORS.black,
    marginBottom: SPACING.sm,
  },
  listItem: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
});

export default SearchScreen;
