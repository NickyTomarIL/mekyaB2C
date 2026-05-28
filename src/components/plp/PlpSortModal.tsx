import PlpModalShell from '@/components/plp/PlpModalShell';
import type {PlpSortOption} from '@/data/plpFeed';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {SPACING} from '@/theme/spacing';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../common/CustomText';

type PlpSortModalProps = {
  visible: boolean;
  options: ReadonlyArray<PlpSortOption>;
  selectedSortId: string;
  defaultSortId: string;
  onClose: () => void;
  onApply: (sortId: string) => void;
};

const PlpSortModal: React.FC<PlpSortModalProps> = ({
  visible,
  options,
  selectedSortId,
  defaultSortId,
  onClose,
  onApply,
}) => {
  const [draftSortId, setDraftSortId] = useState(selectedSortId);

  useEffect(() => {
    if (visible) {
      setDraftSortId(selectedSortId);
    }
  }, [selectedSortId, visible]);

  const handleReset = () => {
    setDraftSortId(defaultSortId);
  };

  const handleApply = () => {
    onApply(draftSortId);
  };

  return (
    <PlpModalShell
      visible={visible}
      title="Sort"
      onClose={onClose}
      onApply={handleApply}
      onReset={handleReset}>
      <View style={styles.content}>
        {options.map(option => {
          const isSelected = option.id === draftSortId;
          return (
            <Pressable
              key={option.id}
              accessibilityRole="button"
              accessibilityLabel={`Sort by ${option.label}`}
              onPress={() => setDraftSortId(option.id)}
              style={({pressed}) => [styles.row, pressed && styles.pressed]}>
              <CustomText style={styles.rowLabel}>{option.label}</CustomText>
              <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
                {isSelected ? (
                  <Ionicons name="checkmark" size={12} color={COLORS.black} />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </PlpModalShell>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  rowLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
    color: COLORS.black,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.disabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default React.memo(PlpSortModal);
