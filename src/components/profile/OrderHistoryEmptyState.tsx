import {CartEmpty} from '@/assets/icons';
import CommonActionableButton from '@/components/buttons/CommonActionableButton';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface OrderHistoryEmptyStateProps {
  onExploreProducts?: () => void;
}

const OrderHistoryEmptyState: React.FC<OrderHistoryEmptyStateProps> = ({
  onExploreProducts,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrap}>
        <CartEmpty width={260} height={260} />
      </View>

      <CustomText style={styles.message}>You haven&apos;t placed any orders yet</CustomText>

      <View style={styles.buttonWrap}>
        <CommonActionableButton
          label="Explore Products"
          handleClick={onExploreProducts ?? (() => undefined)}
          height={52}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.huge,
    paddingHorizontal: SPACING.xxl,
  },
  illustrationWrap: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  message: {
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize:24,
    marginBottom: SPACING.xxl,
  },
  buttonWrap: {
    width: '100%',
    maxWidth: 280,
  },
});

export default React.memo(OrderHistoryEmptyState);
