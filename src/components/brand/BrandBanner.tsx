import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useId, useMemo} from 'react';
import {
  ImageBackground,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

export interface BrandBannerProps {
  imageSource: ImageSourcePropType;
  title: string;
  ctaLabel?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Portrait width:height = 4 : 5 */
const ASPECT_W = 4;
const ASPECT_H = 5;

/**
 * Brand promo tile: image, bottom dark gradient for legible white copy, title + CTA (bottom-left).
 */
const BrandBanner: React.FC<BrandBannerProps> = ({
  imageSource,
  title,
  ctaLabel = 'Explore all products',
  onPress,
  style,
}) => {
  const {width: windowWidth} = useWindowDimensions();
  const reactDomId = useId();
  const gradientId = `brandBannerFade_${reactDomId.replace(/[^a-zA-Z0-9]/g, '')}`;

  const {bannerWidth, bannerHeight} = useMemo(() => {
    const horizontalGutter = SPACING.lg * 2;
    const w = Math.max(0, Math.round(windowWidth - horizontalGutter));
    const h = Math.round((w * ASPECT_H) / ASPECT_W);
    return {bannerWidth: w, bannerHeight: h};
  }, [windowWidth]);

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${title}. ${ctaLabel}`}
        onPress={onPress}
        style={({pressed}) => [
          styles.card,
          {width: bannerWidth, height: bannerHeight},
          pressed && styles.pressed,
        ]}>
        <ImageBackground
          source={imageSource}
          style={styles.imageBg}
          imageStyle={styles.imageRadius}
          resizeMode="cover"
          accessibilityIgnoresInvertColors>
          <Svg
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
            width={bannerWidth}
            height={bannerHeight}
            viewBox={`0 0 ${bannerWidth} ${bannerHeight}`}
            preserveAspectRatio="none">
            <Defs>
              <LinearGradient
                id={gradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
                gradientUnits="objectBoundingBox">
                <Stop offset="0" stopColor="#000000" stopOpacity={0} />
                <Stop offset="0.45" stopColor="#000000" stopOpacity={0.35} />
                <Stop offset="1" stopColor="#000000" stopOpacity={0.78} />
              </LinearGradient>
            </Defs>
            <Rect
              x={0}
              y={0}
              width={bannerWidth}
              height={bannerHeight}
              fill={`url(#${gradientId})`}
            />
          </Svg>
          <View style={styles.textBlock} pointerEvents="box-none">
            <CustomText style={styles.title}>{title}</CustomText>
            <CustomText style={styles.cta}>{ctaLabel}</CustomText>
          </View>
        </ImageBackground>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  card: {
    borderRadius: 4,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.92,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 4,
  },
  textBlock: {
    paddingLeft: SPACING.xl,
    paddingRight: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.xxxl,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: COLORS.white,
    textTransform: 'uppercase',
    marginBottom: SPACING.sm,
  },
  cta: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.white,
    textDecorationLine: 'underline',
  },
});

export default React.memo(BrandBanner);
