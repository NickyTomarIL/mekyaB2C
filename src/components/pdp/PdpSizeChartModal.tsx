import CustomText from '@/components/common/CustomText';
import PdpSizeChartDiagram from '@/components/pdp/PdpSizeChartDiagram';
import PdpSizeChartTable from '@/components/pdp/PdpSizeChartTable';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {
  PDP_SIZE_CHART_COLUMNS,
  PDP_SIZE_CHART_INSTRUCTIONS,
  PDP_SIZE_CHART_TABLES,
  PDP_SIZE_CHART_TITLE,
} from '@/data/pdpSizeChart';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

type PdpSizeChartModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SHEET_MAX_HEIGHT_RATIO = 0.88;
/** Handle + header row (approx.) subtracted from sheet max height for scroll area. */
const SHEET_CHROME_HEIGHT = 76;

const PdpSizeChartModal: React.FC<PdpSizeChartModalProps> = ({visible, onClose}) => {
  const {height: windowHeight} = useWindowDimensions();
  const sheetMaxHeight = Math.round(windowHeight * SHEET_MAX_HEIGHT_RATIO);
  const scrollMaxHeight = sheetMaxHeight - SHEET_CHROME_HEIGHT;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}
      onRequestClose={onClose}>
      <SafeAreaProvider>
        <View style={styles.overlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss size chart"
            style={styles.backdrop}
            onPress={onClose}
          />

          <View style={[styles.sheet, {maxHeight: sheetMaxHeight}]}>
            <View style={styles.handleWrap}>
              <View style={styles.handle} />
            </View>

            <View style={styles.header}>
              <CustomText style={styles.title}>{PDP_SIZE_CHART_TITLE}</CustomText>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close size chart"
                onPress={onClose}
                hitSlop={12}
                style={({pressed}) => [styles.closeBtn, pressed && styles.pressed]}>
                <Ionicons name="close" size={22} color={COLORS.black} />
              </Pressable>
            </View>

            <SafeAreaView edges={['bottom']} style={styles.sheetBody}>
              <ScrollView
                style={[styles.scroll, {maxHeight: scrollMaxHeight}]}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <PdpSizeChartDiagram />

                <View style={styles.instructions}>
                  <CustomText style={styles.instructionsHeading}>
                    {PDP_SIZE_CHART_INSTRUCTIONS.heading}
                  </CustomText>
                  <CustomText style={styles.instructionsIntro}>
                    {PDP_SIZE_CHART_INSTRUCTIONS.intro}
                  </CustomText>

                  {PDP_SIZE_CHART_INSTRUCTIONS.steps.map(step => (
                    <CustomText key={step.letter} style={styles.instructionStep}>
                      <CustomText style={styles.instructionStepTitle}>
                        {step.title}
                      </CustomText>
                      {step.description}
                    </CustomText>
                  ))}
                </View>

                {PDP_SIZE_CHART_TABLES.map(table => (
                  <PdpSizeChartTable
                    key={table.unit}
                    columns={PDP_SIZE_CHART_COLUMNS}
                    table={table}
                  />
                ))}
              </ScrollView>
            </SafeAreaView>
          </View>
        </View>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheet: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 16,
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.extraLightGray,
  },
  header: {
    minHeight: 48,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  title: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 18,
    color: COLORS.black,
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetBody: {
    flexShrink: 1,
    backgroundColor: COLORS.white,
  },
  scroll: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  instructions: {
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  instructionsHeading: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
    color: COLORS.black,
  },
  instructionsIntro: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.darkGray,
  },
  instructionStep: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.darkGray,
  },
  instructionStepTitle: {
    fontFamily: fontFamilies.semiBold,
    color: COLORS.black,
  },
  pressed: {
    opacity: 0.75,
  },
});

export default React.memo(PdpSizeChartModal);
