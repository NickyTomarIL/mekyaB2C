import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

const MAX_VISIBLE = 5;

interface LinkedProductColorSwatchesProps {
  colors: string[];
  moreCount?: number;
  onPressMore?: () => void;
}

const LinkedProductColorSwatches: React.FC<LinkedProductColorSwatchesProps> = ({
  colors,
  moreCount,
  onPressMore,
}) => {
  const visible = colors.slice(0, MAX_VISIBLE);
  const showMoreLink = (moreCount ?? 0) > 0;

  return (
    <View style={styles.row}>
      {visible.map((hex, index) => (
        <View
          key={`${hex}-${index}`}
          style={[styles.dot, {backgroundColor: hex}]}
          accessibilityLabel={`Color ${index + 1}`}
        />
      ))}
      {showMoreLink ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${moreCount} more colors`}
          onPress={onPressMore ?? (() => undefined)}
          style={({pressed}) => [pressed ? styles.pressed : null]}>
          <CustomText style={styles.moreText}>+{moreCount} more</CustomText>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  moreText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.splash,
    textDecorationLine: 'underline',
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(LinkedProductColorSwatches);
