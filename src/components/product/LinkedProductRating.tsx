import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface LinkedProductRatingProps {
  ratingLabel: string;
  starCount?: number;
}

const LinkedProductRating: React.FC<LinkedProductRatingProps> = ({
  ratingLabel,
  starCount = 5,
}) => {
  return (
    <View style={styles.row}>
      {Array.from({length: starCount}, (_, i) => (
        <Ionicons key={`star-${i}`} name="star" size={11} color={COLORS.orange} />
      ))}
      <CustomText style={styles.label}>{ratingLabel}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: SPACING.md,
  },
  label: {
    marginLeft: SPACING.xs,
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: COLORS.darkGray,
  },
});

export default React.memo(LinkedProductRating);
