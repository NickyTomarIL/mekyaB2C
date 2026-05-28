import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import type {PdpAccordionItem} from '@/data/pdpFeed';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpAccordionGroupProps = {
  items: ReadonlyArray<PdpAccordionItem>;
};

const PdpAccordionGroup: React.FC<PdpAccordionGroupProps> = ({items}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {items.map(item => {
        const isExpanded = item.id === expandedId;
        return (
          <View key={item.id} style={styles.itemWrap}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Toggle ${item.title}`}
              onPress={() => setExpandedId(prev => (prev === item.id ? null : item.id))}
              style={({pressed}) => [styles.headerRow, pressed && styles.pressed]}>
              <CustomText style={styles.title}>{item.title}</CustomText>
              <Ionicons
                name={isExpanded ? 'remove' : 'add'}
                size={18}
                color={COLORS.black}
              />
            </Pressable>
            {isExpanded ? <CustomText style={styles.body}>{item.body}</CustomText> : null}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  itemWrap: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
    paddingVertical: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  body: {
    marginTop: SPACING.sm,
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.darkGray,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(PdpAccordionGroup);
