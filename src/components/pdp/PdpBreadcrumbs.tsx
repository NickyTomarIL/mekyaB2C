import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import type {PdpBreadcrumb} from '@/data/pdpFeed';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

type PdpBreadcrumbsProps = {
  items: ReadonlyArray<PdpBreadcrumb>;
  onPressItem?: (id: string) => void;
};

const PdpBreadcrumbs: React.FC<PdpBreadcrumbsProps> = ({items, onPressItem}) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.id}>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={item.label}
              disabled={isLast || !onPressItem}
              onPress={() => onPressItem?.(item.id)}
              style={({pressed}) => [pressed && !isLast ? styles.pressed : null]}>
              <CustomText style={[styles.crumb, isLast && styles.crumbActive]}>
                {item.label}
              </CustomText>
            </Pressable>
            {!isLast ? <CustomText style={styles.separator}> / </CustomText> : null}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  crumb: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  crumbActive: {
    fontFamily: fontFamilies.medium,
    color: COLORS.black,
  },
  separator: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default React.memo(PdpBreadcrumbs);
