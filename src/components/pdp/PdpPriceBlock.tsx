import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type PdpPriceBlockProps = {
  price: string;
  mrp?: string;
  discount?: string;
};

const PdpPriceBlock: React.FC<PdpPriceBlockProps> = ({price, mrp, discount}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.price}>{price}</CustomText>
      {mrp || discount ? (
        <View style={styles.metaRow}>
          {mrp ? <CustomText style={styles.mrp}>{mrp}</CustomText> : null}
          {discount ? <CustomText style={styles.discount}>{discount}</CustomText> : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.sm,
  },
  price: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    color: COLORS.black,
  },
  metaRow: {
    marginTop: SPACING.xs,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  mrp: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  discount: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.success,
  },
});

export default React.memo(PdpPriceBlock);
