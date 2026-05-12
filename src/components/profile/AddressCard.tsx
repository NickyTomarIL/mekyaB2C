import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import type {ProfileAddress} from '@/screens/Profile/profileAddressTypes';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface AddressCardProps {
  address: ProfileAddress;
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

function formatAddressLines(a: ProfileAddress): string[] {
  const lines: string[] = [a.line1, a.line2];
  if (a.landmark.trim()) {
    lines.push(a.landmark);
  }
  lines.push(`${a.townCity}, ${a.state} - ${a.pinCode}`);
  return lines.filter(Boolean);
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selected,
  onSelect,
  onEdit,
  onRemove,
}) => {
  const detailLines = formatAddressLines(address);

  return (
    <View
      style={[
        styles.card,
        selected ? styles.cardSelected : styles.cardUnselected,
      ]}>
      <View style={styles.topRow}>
        <Ionicons
          name="location-outline"
          size={22}
          color={COLORS.profileMenuIcon}
          style={styles.pinIcon}
        />
        <CustomText style={styles.name} numberOfLines={1}>
          {address.fullName}
        </CustomText>
        <View style={styles.badge}>
          <CustomText style={styles.badgeText}>{address.saveAs}</CustomText>
        </View>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{checked: selected}}
          accessibilityLabel={`Set default address for ${address.fullName}`}
          onPress={onSelect}
          hitSlop={8}
          style={[
            styles.radioOuter,
            selected ? styles.radioOuterSelected : styles.radioOuterUnselected,
          ]}>
          {selected ? <View style={styles.radioInner} /> : null}
        </Pressable>
      </View>

      <View style={styles.addressBlock}>
        {detailLines.map((line, index) => (
          <CustomText
            key={`${address.id}-line-${index}`}
            style={styles.addressLine}>
            {line}
          </CustomText>
        ))}
      </View>

      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Edit ${address.fullName}`}
          onPress={onEdit}
          style={({pressed}) => [
            styles.actionBtn,
            styles.actionBtnLeft,
            pressed && styles.actionBtnPressed,
          ]}>
          <CustomText style={styles.actionLabel}>Edit</CustomText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${address.fullName}`}
          onPress={onRemove}
          style={({pressed}) => [
            styles.actionBtn,
            pressed && styles.actionBtnPressed,
          ]}>
          <CustomText style={styles.actionLabel}>Remove</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 4,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: COLORS.splash,
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: COLORS.borderInput,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIcon: {
    marginRight: SPACING.sm,
  },
  name: {
    flex: 1,
    fontFamily: fontFamilies.semiBold,
    fontSize: 16,
    color: COLORS.black,
    marginRight: SPACING.sm,
  },
  badge: {
    backgroundColor: COLORS.addressBadgeBackground,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  badgeText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.splash,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.splash,
  },
  radioOuterUnselected: {
    borderColor: COLORS.borderInput,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.splash,
  },
  addressBlock: {
    marginTop: SPACING.md,
    paddingLeft: 30,
  },
  addressLine: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: SPACING.lg,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 6,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  actionBtnLeft: {
    marginRight: SPACING.md,
  },
  actionBtnPressed: {
    opacity: 0.75,
  },
  actionLabel: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    color: COLORS.splash,
  },
});

export default React.memo(AddressCard);
