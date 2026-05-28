import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpFulfillmentBlockProps = {
  pickupLabel: string;
  deliveryZip: string;
  deliveryNote: string;
  onPressPickup?: () => void;
  onPressChangeZip?: () => void;
};

const PdpFulfillmentBlock: React.FC<PdpFulfillmentBlockProps> = ({
  pickupLabel,
  deliveryZip,
  deliveryNote,
  onPressPickup,
  onPressChangeZip,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={pickupLabel}
        onPress={onPressPickup}
        style={({pressed}) => [styles.pickupRow, pressed && styles.pressed]}>
        <Ionicons name="location-outline" size={18} color={COLORS.black} />
        <CustomText style={styles.pickupText}>{pickupLabel}</CustomText>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
      </Pressable>

      <View style={styles.deliveryRow}>
        <CustomText style={styles.deliveryLabel}>
          Deliver to{' '}
          <CustomText style={styles.deliveryZip}>{deliveryZip}</CustomText>
        </CustomText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change delivery location"
          onPress={onPressChangeZip}
          style={({pressed}) => [pressed && styles.pressed]}>
          <CustomText style={styles.changeLink}>Change</CustomText>
        </Pressable>
      </View>

      <CustomText style={styles.deliveryNote}>{deliveryNote}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  pickupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  pickupText: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  deliveryLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.darkGray,
  },
  deliveryZip: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
  },
  changeLink: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  deliveryNote: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.textMuted,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(PdpFulfillmentBlock);
