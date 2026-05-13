import CustomText from '@/components/common/CustomText';
import type {ReelPreviewCardProps} from '@/components/reels/reelTypes';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useId} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
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
  variant = 'reel',
  cardWidth,
  onPressPlay,
}) => {
  const isHomePreview = variant === 'homePreview';
  const scrimGradientId = `reelBottomFade_${useId().replace(/:/g, '')}`;

  return (
    <View style={[styles.root, cardWidth != null ? {width: cardWidth} : null]}>
      <View style={styles.mediaShell}>
        {media ?? (
          <View style={styles.mediaPlaceholder}>
            <Ionicons name="videocam-outline" size={48} color="rgba(255,255,255,0.35)" />
          </View>
        )}
        

        {isHomePreview ? (
          <View style={styles.playCenter} pointerEvents="box-none">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Play reel"
              onPress={onPressPlay ?? (() => undefined)}
              style={({pressed}) => [styles.playFab, pressed ? styles.pressed : null]}>
              <View style={styles.playCircle}>
                <Ionicons name="play" size={10} color="#E53935" style={styles.playIconOffset} />
              </View>
            </Pressable>
          </View>
        ) : null}
        <View style={styles.mediaBottomScrim} pointerEvents="none">
          <Svg
            style={StyleSheet.absoluteFill}
            width="100%"
            height="100%"
            preserveAspectRatio="none">
            <Defs>
              <LinearGradient
                id={scrimGradientId}
                x1="0.5"
                y1="1"
                x2="0.5"
                y2="0.38"
                gradientUnits="objectBoundingBox">
                <Stop offset="0" stopColor="#000000" stopOpacity={0.78} />
                <Stop offset="0.55" stopColor="#000000" stopOpacity={0.28} />
                <Stop offset="1" stopColor="#000000" stopOpacity={0} />
              </LinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill={`url(#${scrimGradientId})`}
            />
          </Svg>
        </View>

        <View
          style={[styles.leftColumn, isHomePreview ? styles.leftColumnHome : null]}
          pointerEvents="box-none">
          <View style={[styles.creatorRow, isHomePreview ? styles.creatorRowHome : null]}>
            <View style={styles.avatar}>
              <Ionicons name="storefront-outline" size={20} color={COLORS.darkGray} />
            </View>
            {isHomePreview ? (
              <CustomText style={styles.creatorNameInline} numberOfLines={1}>
                {creatorName}
              </CustomText>
            ) : (
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
            )}
          </View>
          

          {!isHomePreview ? (
            <View style={styles.audioRow}>
              <Ionicons name="musical-notes-outline" size={14} color={COLORS.white} />
              <CustomText style={styles.audioLabel}>{audioLabel}</CustomText>
            </View>
          ) : null}

          {caption ? (
            <CustomText
              numberOfLines={isHomePreview ? 2 : 3}
              style={styles.caption}>
              {caption}
            </CustomText>
          ) : null}
        </View>

        {!isHomePreview ? (
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
        ) : null}
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
  /** Full-bleed overlay; fade is bottom → mid via SVG gradient inside. */
  mediaBottomScrim: {
    ...StyleSheet.absoluteFill,
  },
  playCenter: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playFab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconOffset: {
    marginLeft: 4,
  },
  leftColumn: {
    position: 'absolute',
    left: SPACING.lg,
    right: 72,
    bottom: SPACING.lg,
  },
  leftColumnHome: {
    right: SPACING.lg,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SPACING.md,
  },
  creatorRowHome: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
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
    fontSize: 16,
    color: COLORS.white,
    marginBottom: SPACING.sm,
  },
  creatorNameInline: {
    flex: 1,
    minWidth: 0,
    fontFamily: fontFamilies.semiBold,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.white,
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
