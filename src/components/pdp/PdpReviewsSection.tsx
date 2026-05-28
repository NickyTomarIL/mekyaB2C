import CustomText from '@/components/common/CustomText';
import PdpReviewList from '@/components/pdp/PdpReviewList';
import PdpReviewSummary from '@/components/pdp/PdpReviewSummary';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import type {
  PdpRatingBreakdownItem,
  PdpReviewItem,
  PdpReviewSortOption,
} from '@/data/pdpFeed';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpReviewsSectionProps = {
  average: number;
  totalRatings: number;
  breakdown: ReadonlyArray<PdpRatingBreakdownItem>;
  reviews: ReadonlyArray<PdpReviewItem>;
  sortLabel: PdpReviewSortOption;
  currentPage: number;
  totalPages: number;
  onPressWriteReview?: () => void;
  onPressSort?: () => void;
  onSelectPage?: (page: number) => void;
};

const PdpReviewsSection: React.FC<PdpReviewsSectionProps> = ({
  average,
  totalRatings,
  breakdown,
  reviews,
  sortLabel,
  currentPage,
  totalPages,
  onPressWriteReview,
  onPressSort,
  onSelectPage,
}) => {
  return (
    <View style={styles.section}>
      <CustomText style={styles.sectionTitle}>Ratings & Reviews</CustomText>

      <PdpReviewSummary
        average={average}
        totalRatings={totalRatings}
        breakdown={breakdown}
      />

      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Write a review"
          onPress={onPressWriteReview}
          style={({pressed}) => [styles.writeReviewBtn, pressed && styles.pressed]}>
          <CustomText style={styles.writeReviewText}>Write a Review</CustomText>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Sort reviews by ${sortLabel}`}
          onPress={onPressSort}
          style={({pressed}) => [styles.sortBtn, pressed && styles.pressed]}>
          <CustomText style={styles.sortLabel}>Sort by: {sortLabel}</CustomText>
          <Ionicons name="chevron-down" size={14} color={COLORS.black} />
        </Pressable>
      </View>

      <PdpReviewList reviews={reviews} />

      {totalPages > 1 ? (
        <View style={styles.paginationRow}>
          {Array.from({length: totalPages}).map((_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;
            return (
              <Pressable
                key={`review-page-${page}`}
                accessibilityRole="button"
                accessibilityLabel={`Go to review page ${page}`}
                onPress={() => onSelectPage?.(page)}
                style={({pressed}) => [
                  styles.pageBtn,
                  isActive && styles.pageBtnActive,
                  pressed && styles.pressed,
                ]}>
                <CustomText style={[styles.pageLabel, isActive && styles.pageLabelActive]}>
                  {page}
                </CustomText>
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    color: COLORS.black,
  },
  actionsRow: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  writeReviewBtn: {
    minHeight: 36,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeReviewText: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    minHeight: 36,
    paddingHorizontal: SPACING.sm,
  },
  sortLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.black,
  },
  paginationRow: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  pageBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageBtnActive: {
    borderColor: COLORS.splash,
    backgroundColor: COLORS.splash,
  },
  pageLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  pageLabelActive: {
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(PdpReviewsSection);
