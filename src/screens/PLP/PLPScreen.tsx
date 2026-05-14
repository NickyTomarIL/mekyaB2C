import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * Sample product listing page (PLP) — replace with grid, filters, and pagination.
 */
const PLPScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <CustomText style={styles.headerTitle}>Product listing</CustomText>
        <CustomText style={styles.headerSubtitle}>
          Category: Men · Casual wear (sample)
        </CustomText>
      </View>
      <View style={styles.headerDivider} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <CustomText style={styles.meta}>
          Showing 1–24 of 128 results · Sort: Recommended (dummy)
        </CustomText>
        <CustomText style={styles.body}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident.
        </CustomText>
        <CustomText style={styles.placeholder}>
          [Product grid placeholder — add FlatList of product cards here]
        </CustomText>
        <CustomText style={styles.body}>
          Similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio nam libero tempore, cum soluta nobis est eligendi optio.
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
  headerSubtitle: {
    marginTop: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.black,
    opacity: 0.72,
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
  meta: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.black,
    opacity: 0.65,
    marginBottom: SPACING.md,
  },
  body: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  placeholder: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.black,
    opacity: 0.55,
    fontStyle: 'italic',
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: 8,
  },
});

export default PLPScreen;
