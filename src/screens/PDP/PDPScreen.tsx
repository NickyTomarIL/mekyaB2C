import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

/**
 * Sample product detail page (PDP) — replace with gallery, variants, and ATC flow.
 */
const PDPScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroPlaceholder}>
          <CustomText style={styles.heroLabel}>
            [Image carousel placeholder]
          </CustomText>
        </View>

        <CustomText style={styles.brand}>Sample Brand Co.</CustomText>
        <CustomText style={styles.title}>
          Relaxed Fit Organic Cotton Tee — Midnight Navy
        </CustomText>
        <CustomText style={styles.price}>₹1,299 · MRP ₹1,799 (dummy)</CustomText>

        <CustomText style={styles.sectionTitle}>Description</CustomText>
        <CustomText style={styles.body}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
          sit amet, consectetur, adipisci velit.
        </CustomText>

        <CustomText style={styles.sectionTitle}>Details (dummy)</CustomText>
        <CustomText style={styles.body}>
          Material: 100% organic cotton{'\n'}
          Fit: Relaxed{'\n'}
          Care: Machine wash cold{'\n'}
          Country of origin: India
        </CustomText>

        <CustomText style={styles.sectionTitle}>Shipping & returns</CustomText>
        <CustomText style={styles.body}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </CustomText>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xxxl,
  },
  heroPlaceholder: {
    height: 320,
    backgroundColor: COLORS.extraLightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLabel: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.black,
    opacity: 0.5,
  },
  brand: {
    marginTop: SPACING.lg,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: COLORS.black,
    opacity: 0.7,
  },
  title: {
    marginTop: SPACING.xs,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.medium,
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.black,
  },
  price: {
    marginTop: SPACING.md,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  sectionTitle: {
    marginTop: SPACING.xl,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    color: COLORS.black,
  },
  body: {
    marginTop: SPACING.sm,
    marginHorizontal: SPACING.lg,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.black,
  },
});

export default PDPScreen;
