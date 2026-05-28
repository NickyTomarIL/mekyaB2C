import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  type AccessibilityRole,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';

type PlpModalShellProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  applyLabel?: string;
  closeLabel?: string;
  applyDisabled?: boolean;
  children: React.ReactNode;
};

const PlpModalShell: React.FC<PlpModalShellProps> = ({
  visible,
  title,
  onClose,
  onApply,
  onReset,
  applyLabel = 'Apply',
  closeLabel = 'Close',
  applyDisabled = false,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.headerTitleWrap}>
            <Ionicons name="options-outline" size={18} color={COLORS.black} />
            <CustomText style={styles.headerTitle}>{title}</CustomText>
          </View>
          <Pressable
            accessibilityRole={'button' satisfies AccessibilityRole}
            accessibilityLabel={`Reset ${title}`}
            onPress={onReset}
            style={({pressed}) => [styles.headerReset, pressed && styles.pressed]}>
            <CustomText style={styles.headerResetText}>Reset</CustomText>
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.body}>{children}</View>

        <View style={styles.bottomBar}>
          <Pressable
            accessibilityRole={'button' satisfies AccessibilityRole}
            accessibilityLabel={`Close ${title}`}
            onPress={onClose}
            style={({pressed}) => [
              styles.bottomButton,
              styles.closeButton,
              pressed && styles.pressed,
            ]}>
            <CustomText style={styles.closeButtonText}>{closeLabel}</CustomText>
          </Pressable>

          <Pressable
            accessibilityRole={'button' satisfies AccessibilityRole}
            accessibilityLabel={`Apply ${title}`}
            disabled={applyDisabled}
            onPress={onApply}
            style={({pressed}) => [
              styles.bottomButton,
              styles.applyButton,
              applyDisabled && styles.applyButtonDisabled,
              pressed && !applyDisabled && styles.pressed,
            ]}>
            <CustomText style={styles.applyButtonText}>{applyLabel}</CustomText>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    minHeight: 56,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
  headerReset: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  headerResetText: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.extraLightGray,
  },
  body: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.extraLightGray,
    backgroundColor: COLORS.white,
  },
  bottomButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  closeButton: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  closeButtonText: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  applyButton: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.black,
  },
  applyButtonDisabled: {
    borderColor: COLORS.disabled,
    backgroundColor: COLORS.disabled,
  },
  applyButtonText: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default React.memo(PlpModalShell);
