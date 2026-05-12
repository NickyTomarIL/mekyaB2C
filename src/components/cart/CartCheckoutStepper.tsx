import { Card } from '@/assets/icons';
import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import { fontFamilies } from '@/constants/fonts';
import { SPACING } from '@/theme/spacing';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type CheckoutStepKey = 'bag' | 'address' | 'payment';

interface CartCheckoutStepperProps {
  activeStep: CheckoutStepKey;
}

const STEPS: {
  key: CheckoutStepKey;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
}[] = [
    { key: 'bag', label: 'Bag', icon: 'bag-outline' },
    { key: 'address', label: 'Address', icon: 'location-outline' },
    { key: 'payment', label: 'Payment', icon: 'card-outline' },
  ];

const CartCheckoutStepper: React.FC<CartCheckoutStepperProps> = ({ activeStep }) => {
  const activeIndex = STEPS.findIndex(s => s.key === activeStep);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {STEPS.map((step, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = step.key === activeStep;
          return (
            <React.Fragment key={step.key}>
              <View style={styles.stepCol}>
                <View
                  style={[
                    styles.circle,
                    isActive ? styles.circleActive : styles.circleInactive,
                  ]}>
                  {step.icon === 'card-outline' ? <Card /> :
                    <Ionicons
                      name={step.icon}
                      size={18}
                      color={isActive ? COLORS.white : COLORS.textMuted}
                    />}

                </View>
                <CustomText
                  style={[
                    styles.stepLabel,
                    isCurrent ? styles.stepLabelActive : styles.stepLabelInactive,
                  ]}>
                  {step.label}
                </CustomText>
              </View>
              {index < STEPS.length - 1 ? (
                <View style={styles.connectorWrap}>
                  <View style={[styles.connector, index < activeIndex ? styles.connectorDone : null]} />
                </View>
              ) : null}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginBottom: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stepCol: {
    alignItems: 'center',
    width: 72,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: COLORS.splash,
  },
  circleInactive: {
    backgroundColor: '#E8ECEE',
    borderWidth: 1,
    borderColor: '#D8DCDE',
  },
  stepLabel: {
    marginTop: SPACING.sm,
    fontSize: 12,
    textAlign: 'center',
  },
  stepLabelActive: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
  },
  stepLabelInactive: {
    fontFamily: fontFamilies.regular,
    color: COLORS.textMuted,
  },
  connectorWrap: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: SPACING.xs,
    minWidth: 24,
  },
  connector: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#D8DCDE',
  },
  connectorDone: {
    backgroundColor: COLORS.splash,
  },
});

export default React.memo(CartCheckoutStepper);
