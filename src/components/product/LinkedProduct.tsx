import CustomText from '@/components/common/CustomText';
import LinkedProductCard from '@/components/product/LinkedProductCard';
import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useMemo} from 'react';
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

export interface LinkedProductProps {
  /** Section heading (default matches design). */
  title?: string;
  items: ReadonlyArray<LinkedProductItem>;
  onQuickAdd?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onPressMoreColors?: (id: string) => void;
  onPressProduct?: (id: string) => void;
  /** Merge with outer section wrapper (e.g. `{paddingHorizontal: 0}` when parent scroll view pads). */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const LinkedProduct: React.FC<LinkedProductProps> = ({
  title = 'Linked Products',
  items,
  onQuickAdd,
  onToggleFavorite,
  onPressMoreColors,
  onPressProduct,
  contentContainerStyle,
}) => {
  const {width: windowWidth} = useWindowDimensions();

  const cardWidth = useMemo(() => {
    const horizontalPad = SPACING.lg * 2;
    const available = windowWidth - horizontalPad;
    return Math.min(176, Math.round(available * 0.52));
  }, [windowWidth]);

  return (
    <View style={[styles.section, contentContainerStyle]}>
      <CustomText style={styles.heading}>{title}</CustomText>
      <FlatList
        horizontal
        data={items}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <LinkedProductCard
            item={item}
            cardWidth={cardWidth}
            onQuickAdd={onQuickAdd}
            onToggleFavorite={onToggleFavorite}
            onPressMoreColors={onPressMoreColors}
            onPress={onPressProduct}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  heading: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: COLORS.darkGray,
    marginBottom: SPACING.lg,
  },
  listContent: {
    paddingRight: SPACING.lg,
  },
});

export default React.memo(LinkedProduct);
