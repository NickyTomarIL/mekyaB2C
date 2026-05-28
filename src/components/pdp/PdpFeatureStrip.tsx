import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import type {PdpFeatureBadge} from '@/data/pdpFeed';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PdpFeatureStripProps = {
  items: ReadonlyArray<PdpFeatureBadge>;
};

const PdpFeatureStrip: React.FC<PdpFeatureStripProps> = ({items}) => {
  const renderIcon = (iconKey: PdpFeatureBadge['iconKey']) => {
    switch (iconKey) {
      case 'cotton':
        return <Ionicons name="shirt-outline" size={22} color={COLORS.black} />;
      case 'fit':
        return <Ionicons name="person-outline" size={22} color={COLORS.black} />;
      case 'delivery':
        return <Ionicons name="car-outline" size={22} color={COLORS.black} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.container}>
        {items.map(item => (
          <View key={item.id} style={styles.badge}>
            {renderIcon(item.iconKey)}
            <CustomText style={styles.badgeLabel}>{item.label}</CustomText>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
    backgroundColor: '#F5F5F5',
    paddingVertical: SPACING.lg,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  badge: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  badgeLabel: {
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.darkGray,
  },
});

export default React.memo(PdpFeatureStrip);
