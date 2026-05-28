import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import type {PdpReviewItem} from '@/data/pdpFeed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpReviewListProps = {
  reviews: ReadonlyArray<PdpReviewItem>;
};

const PdpReviewList: React.FC<PdpReviewListProps> = ({reviews}) => {
  return (
    <View style={styles.container}>
      {reviews.map(review => (
        <View key={review.id} style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.userRow}>
              <CustomText style={styles.userName}>{review.userName}</CustomText>
              {review.isVerifiedBuyer ? (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={12} color={COLORS.success} />
                  <CustomText style={styles.verifiedText}>Verified Buyer</CustomText>
                </View>
              ) : null}
            </View>
            <CustomText style={styles.date}>{review.date}</CustomText>
          </View>

          <View style={styles.ratingRow}>
            {Array.from({length: 5}).map((_, index) => (
              <Ionicons
                key={`${review.id}-star-${index}`}
                name={index < review.rating ? 'star' : 'star-outline'}
                size={13}
                color={COLORS.orange}
              />
            ))}
          </View>

          <CustomText style={styles.reviewTitle}>{review.title}</CustomText>
          <CustomText style={styles.reviewBody}>{review.body}</CustomText>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.md,
    gap: SPACING.lg,
  },
  card: {
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  userRow: {
    flex: 1,
    gap: SPACING.xs,
  },
  userName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: COLORS.black,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: COLORS.success,
  },
  date: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: COLORS.textMuted,
  },
  ratingRow: {
    marginTop: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  reviewTitle: {
    marginTop: SPACING.sm,
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: COLORS.black,
  },
  reviewBody: {
    marginTop: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.darkGray,
  },
});

export default React.memo(PdpReviewList);
