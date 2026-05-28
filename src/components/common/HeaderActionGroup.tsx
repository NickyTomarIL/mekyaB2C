import {Cart} from '@/assets/icons';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {Pressable, StyleSheet, type ViewStyle, View} from 'react-native';

export type HeaderActionItem = {
  id: string;
  accessibilityLabel: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

type HeaderActionGroupProps = {
  items: ReadonlyArray<HeaderActionItem>;
  showCartIcon?: boolean;
  onCartPress?: () => void;
  cartAccessibilityLabel?: string;
  containerStyle?: ViewStyle;
};

const HeaderActionGroup: React.FC<HeaderActionGroupProps> = ({
  items,
  showCartIcon = false,
  onCartPress,
  cartAccessibilityLabel = 'Cart',
  containerStyle,
}) => {
  return (
    <View style={[styles.actionsRow, containerStyle]}>
      {items.map(({id, accessibilityLabel, icon, onPress}) => (
        <Pressable
          key={id}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          hitSlop={12}
          onPress={onPress}
          style={({pressed}) => [styles.iconHit, pressed && styles.pressed]}>
          {icon}
        </Pressable>
      ))}
      {showCartIcon ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={cartAccessibilityLabel}
          hitSlop={12}
          onPress={onCartPress}
          style={({pressed}) => [styles.iconHit, pressed && styles.pressed]}>
          <Cart />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  iconHit: {
    padding: SPACING.xs,
  },
  pressed: {
    opacity: 0.65,
  },
});

export default React.memo(HeaderActionGroup);
