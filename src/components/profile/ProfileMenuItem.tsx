import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '@/components/common/CustomText';

export interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  /** Red icon + label (e.g. Logout). */
  destructive?: boolean;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  label,
  onPress,
  destructive = false,
}) => {
  const labelColor = destructive ? COLORS.red : '#5B5B5B';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({pressed}) => [styles.row, pressed && styles.rowPressed]}>
      <View style={styles.iconWrap}>{icon}</View>
      <CustomText style={[styles.label, {color: labelColor}]}>{label}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    opacity: 1,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    padding: 16,
  },
  rowPressed: {
    opacity: 0.65,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  label: {
    flex: 1,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#5B5B5B',
  },
});

export default React.memo(ProfileMenuItem);
