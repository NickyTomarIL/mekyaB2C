import CustomText from '@/components/common/CustomText';
import type {ReelPreviewCardProps} from '@/components/reels/reelTypes';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReelPreviewCard: React.FC<ReelPreviewCardProps> = ({
  creatorName,
  caption,
  audioLabel = 'Original audio',
  likeCountLabel,
  shareCountLabel,
  isSaved = false,
  onPressFollow,
  onPressLike,
  onPressShare,
  onPressSave,
  media,
}) => {
  return (
    <View style={styles.root}>
      <View style={styles.mediaShell}>
        {media ?? (
          <View style={styles.mediaPlaceholder}>
            <Ionicons name="videocam-outline" size={48} color="rgba(255,255,255,0.35)" />
          </View>
        )}
        <View style={styles.mediaBottomScrim} />

        <View style={styles.leftColumn} pointerEvents="box-none">
          <View style={styles.creatorRow}>
            <View style={styles.avatar}>
              <Ionicons name="storefront-outline" size={20} color={COLORS.darkGray} />
            </View>
            <View style={styles.creatorTextBlock}>
              <CustomText style={styles.creatorName}>{creatorName}</CustomText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Follow ${creatorName}`}
                onPress={onPressFollow ?? (() => undefined)}
                style={({pressed}) => [styles.followBtn, pressed ? styles.pressed : null]}>
                <CustomText style={styles.followLabel}>Follow</CustomText>
              </Pressable>
            </View>
          </View>

          <View style={styles.audioRow}>
            <Ionicons name="musical-notes-outline" size={14} color={COLORS.white} />
            <CustomText style={styles.audioLabel}>{audioLabel}</CustomText>
          </View>

          {caption ? (
            <CustomText numberOfLines={3} style={styles.caption}>
              {caption}
            </CustomText>
          ) : null}
        </View>

        <View style={styles.rightRail} pointerEvents="box-none">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Like reel"
            onPress={onPressLike ?? (() => undefined)}
            style={({pressed}) => [styles.railItem, pressed ? styles.pressed : null]}>
            <Ionicons name="heart-outline" size={28} color={COLORS.white} />
            <CustomText style={styles.railCount}>{likeCountLabel}</CustomText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Share reel"
            onPress={onPressShare ?? (() => undefined)}
            style={({pressed}) => [styles.railItem, pressed ? styles.pressed : null]}>
            <Ionicons name="paper-plane-outline" size={26} color={COLORS.white} />
            <CustomText style={styles.railCount}>{shareCountLabel}</CustomText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isSaved ? 'Unsave reel' : 'Save reel'}
            onPress={onPressSave ?? (() => undefined)}
            style={({pressed}) => [styles.railItem, pressed ? styles.pressed : null]}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color={COLORS.white}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  mediaShell: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
    position: 'relative',
  },
  mediaPlaceholder: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2d2d2d',
  },
  mediaBottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '42%',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  leftColumn: {
    position: 'absolute',
    left: SPACING.lg,
    right: 72,
    bottom: SPACING.lg,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  creatorTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  creatorName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  followBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  followLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.white,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  audioLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.white,
    flex: 1,
  },
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.white,
  },
  rightRail: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.xxl,
    alignItems: 'center',
    gap: SPACING.xl,
  },
  railItem: {
    alignItems: 'center',
  },
  railCount: {
    marginTop: 4,
    fontFamily: fontFamilies.medium,
    fontSize: 11,
    color: COLORS.white,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(ReelPreviewCard);
