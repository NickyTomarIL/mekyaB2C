import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CartDeliverySectionProps {
  onCheckPincode?: (pincode: string) => void;
}

const CartDeliverySection: React.FC<CartDeliverySectionProps> = ({onCheckPincode}) => {
  const [pincode, setPincode] = useState('');

  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <Ionicons name="cube-outline" size={20} color={COLORS.black} />
        <CustomText style={styles.sectionTitle}>Check Delivery Details</CustomText>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={pincode}
          onChangeText={setPincode}
          placeholder="Enter Pincode"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          accessibilityLabel="Enter delivery pincode"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Check delivery for pincode"
          onPress={() => onCheckPincode?.(pincode.trim())}
          style={({pressed}) => [styles.checkBtn, pressed ? styles.checkPressed : null]}>
          <CustomText style={styles.checkLabel}>CHECK</CustomText>
        </Pressable>
      </View>

      <CustomText style={styles.helper}>
        Please enter PIN code to check delivery time & Pay on Delivery Availability.
      </CustomText>

      <View style={styles.statusBlock}>
        <View style={styles.statusRow}>
          <Ionicons name="car-outline" size={18} color="#2E7D32" />
          <CustomText style={styles.deliveryDate}>
            Expected delivery by Sunday, 8 Dec
          </CustomText>
        </View>
        <View style={styles.statusRow}>
          <Ionicons name="cash-outline" size={18} color={COLORS.darkGray} />
          <CustomText style={styles.codText}>Cash on delivery is available</CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    paddingVertical: SPACING.lg,
    marginTop: SPACING.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
    color: COLORS.black,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  checkBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    justifyContent: 'center',
  },
  checkPressed: {
    opacity: 0.75,
  },
  checkLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: COLORS.splash,
    letterSpacing: 0.5,
  },
  helper: {
    marginTop: SPACING.sm,
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  statusBlock: {
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  deliveryDate: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: '#2E7D32',
    flex: 1,
  },
  codText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.darkGray,
    flex: 1,
  },
});

export default React.memo(CartDeliverySection);
