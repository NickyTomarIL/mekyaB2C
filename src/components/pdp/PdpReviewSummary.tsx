import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import type {PdpRatingBreakdownItem} from '@/data/pdpFeed';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpReviewSummaryProps = {
  average: number;
  totalRatings: number;
  breakdown: ReadonlyArray<PdpRatingBreakdownItem>;
};

const PdpReviewSummary: React.FC<PdpReviewSummaryProps> = ({
  average,
  totalRatings,
  breakdown,
}) => {
  const maxCount = useMemo(
    () => Math.max(...breakdown.map(item => item.count), 1),
    [breakdown],
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <CustomText style={styles.average}>{average.toFixed(1)}/5</CustomText>
        <View style={styles.starRow}>
          {Array.from({length: 5}).map((_, index) => (
            <Ionicons
              key={`summary-star-${index}`}
              name="star"
              size={13}
              color={COLORS.orange}
            />
          ))}
        </View>
        <CustomText style={styles.total}>{totalRatings} ratings</CustomText>
      </View>

      <View style={styles.right}>
        {breakdown.map(item => {
          const fillRatio = item.count / maxCount;
          return (
            <View key={`rating-${item.stars}`} style={styles.breakdownRow}>
              <CustomText style={styles.breakdownLabel}>{item.stars}</CustomText>
              <View style={styles.trackWrap}>
                <View style={styles.trackBase}>
                  <View style={[styles.trackFill, {width: `${fillRatio * 100}%`}]} />
                </View>
              </View>
              <CustomText style={styles.breakdownCount}>{item.count}</CustomText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  left: {
    width: 88,
    alignItems: 'flex-start',
  },
  average: {
    fontFamily: fontFamilies.bold,
    fontSize: 28,
    color: COLORS.black,
    lineHeight: 34,
  },
  starRow: {
    marginTop: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  total: {
    marginTop: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.darkGray,
  },
  right: {
    flex: 1,
    gap: SPACING.xs,
    justifyContent: 'center',
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  breakdownLabel: {
    width: 10,
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: COLORS.darkGray,
  },
  trackWrap: {
    flex: 1,
  },
  trackBase: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.extraLightGray,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    backgroundColor: COLORS.splash,
  },
  breakdownCount: {
    width: 32,
    textAlign: 'right',
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: COLORS.darkGray,
  },
});

export default React.memo(PdpReviewSummary);
