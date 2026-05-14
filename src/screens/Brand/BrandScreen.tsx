import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * Sample brand page — replace with hero, story, and curated collections.
 */
const BrandScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <CustomText style={styles.bannerTitle}>Aurora Lane</CustomText>
          <CustomText style={styles.bannerTagline}>
            Contemporary essentials · Est. 2018 (dummy brand)
          </CustomText>
        </View>

        <CustomText style={styles.sectionTitle}>About the brand</CustomText>
        <CustomText style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta.
        </CustomText>

        <CustomText style={styles.sectionTitle}>What we stand for</CustomText>
        <CustomText style={styles.body}>
          Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
        </CustomText>

        <CustomText style={styles.sectionTitle}>Shop by collection (dummy)</CustomText>
        <CustomText style={styles.list}>
          New arrivals · Workwear · Weekend · Accessories
        </CustomText>

        <CustomText style={styles.placeholder}>
          [Featured products / lookbook carousel placeholder]
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
  banner: {
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    backgroundColor: COLORS.extraLightGray,
  },
  bannerTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 24,
    color: COLORS.black,
  },
  bannerTagline: {
    marginTop: SPACING.sm,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
    opacity: 0.75,
  },
  sectionTitle: {
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.medium,
    fontSize: 16,
    color: COLORS.black,
  },
  body: {
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
  },
  list: {
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  placeholder: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    padding: SPACING.md,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.black,
    opacity: 0.55,
    fontStyle: 'italic',
    backgroundColor: COLORS.extraLightGray,
    borderRadius: 8,
  },
});

export default BrandScreen;
