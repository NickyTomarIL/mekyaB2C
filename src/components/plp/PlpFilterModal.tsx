import CustomText from '@/components/common/CustomText';
import PlpModalShell from '@/components/plp/PlpModalShell';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {
  type PlpFilterDraftState,
  type PlpFilterOption,
  type PlpFilterSectionConfig,
  type PlpFilterSectionKey,
} from '@/data/plpFeed';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PlpFilterModalProps = {
  visible: boolean;
  sectionOrder: ReadonlyArray<{key: PlpFilterSectionKey; title: string}>;
  config: Record<PlpFilterSectionKey, PlpFilterSectionConfig>;
  appliedFilters: PlpFilterDraftState;
  defaultFilters: PlpFilterDraftState;
  onClose: () => void;
  onApply: (next: PlpFilterDraftState) => void;
};

const PRICE_MIN_BOUND = 0;
const PRICE_MAX_BOUND = 5000;

const SEARCH_ENABLED_SECTION_KEYS: ReadonlyArray<PlpFilterSectionKey> = [
  'categories',
  'brands',
];

const PlpFilterModal: React.FC<PlpFilterModalProps> = ({
  visible,
  sectionOrder,
  config,
  appliedFilters,
  defaultFilters,
  onClose,
  onApply,
}) => {
  const [draft, setDraft] = useState<PlpFilterDraftState>(appliedFilters);
  const [searchBySection, setSearchBySection] = useState<
    Partial<Record<PlpFilterSectionKey, string>>
  >({});

  useEffect(() => {
    if (visible) {
      setDraft(appliedFilters);
      setSearchBySection({});
    }
  }, [appliedFilters, visible]);

  const activeSection = draft.activeSection;
  const activeConfig = config[activeSection];
  const activeSearchTerm = (searchBySection[activeSection] ?? '').trim().toLowerCase();

  const filteredOptions = useMemo(() => {
    if (!activeSearchTerm) {
      return activeConfig.options;
    }
    return activeConfig.options.filter(option =>
      option.label.toLowerCase().includes(activeSearchTerm),
    );
  }, [activeConfig.options, activeSearchTerm]);

  const updateSelection = (section: PlpFilterSectionKey, optionId: string) => {
    setDraft(current => {
      const existing = current.selectedBySection[section] ?? [];
      const isSelected = existing.includes(optionId);
      const nextValues = isSelected
        ? existing.filter(id => id !== optionId)
        : [...existing, optionId];

      return {
        ...current,
        selectedBySection: {
          ...current.selectedBySection,
          [section]: nextValues,
        },
      };
    });
  };

  const handleReset = () => {
    setDraft(defaultFilters);
    setSearchBySection({});
  };

  const handleApply = () => {
    onApply(draft);
  };

  const selectedIds = draft.selectedBySection[activeSection] ?? [];

  return (
    <PlpModalShell
      visible={visible}
      title="Filter"
      onClose={onClose}
      onApply={handleApply}
      onReset={handleReset}>
      <View style={styles.content}>
        <View style={styles.leftRail}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {sectionOrder.map(section => {
              const isActive = section.key === activeSection;
              return (
                <Pressable
                  key={section.key}
                  accessibilityRole="button"
                  accessibilityLabel={`Open ${section.title} filters`}
                  onPress={() =>
                    setDraft(current => ({...current, activeSection: section.key}))
                  }
                  style={({pressed}) => [
                    styles.railItem,
                    isActive && styles.railItemActive,
                    pressed && styles.pressed,
                  ]}>
                  {isActive ? <View style={styles.railActiveMarker} /> : null}
                  <CustomText
                    style={[styles.railItemText, isActive && styles.railItemTextActive]}>
                    {section.title}
                  </CustomText>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.rightPanel}>
          {SEARCH_ENABLED_SECTION_KEYS.includes(activeSection) ? (
            <View style={styles.searchWrap}>
              <Ionicons name="search-outline" size={16} color={COLORS.textMuted} />
              <TextInput
                value={searchBySection[activeSection] ?? ''}
                onChangeText={value =>
                  setSearchBySection(current => ({...current, [activeSection]: value}))
                }
                placeholder={activeConfig.searchPlaceholder ?? 'Search'}
                placeholderTextColor={COLORS.textMuted}
                style={styles.searchInput}
              />
            </View>
          ) : null}

          <ScrollView
            style={styles.optionScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionScrollContent}>
            {activeSection === 'priceRange' ? (
              <PriceRangeSection draft={draft} setDraft={setDraft} />
            ) : (
              filteredOptions.map(option => (
                <FilterRow
                  key={option.id}
                  sectionKey={activeSection}
                  option={option}
                  selected={selectedIds.includes(option.id)}
                  onToggle={updateSelection}
                />
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </PlpModalShell>
  );
};

const FilterRow: React.FC<{
  sectionKey: PlpFilterSectionKey;
  option: PlpFilterOption;
  selected: boolean;
  onToggle: (section: PlpFilterSectionKey, optionId: string) => void;
}> = ({sectionKey, option, selected, onToggle}) => {
  const isColorSection = sectionKey === 'colors';
  const isRatingSection = sectionKey === 'rating';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Toggle ${option.label}`}
      onPress={() => onToggle(sectionKey, option.id)}
      style={({pressed}) => [styles.optionRow, pressed && styles.pressed]}>
      <View style={styles.optionContent}>
        {isColorSection && option.colorHex ? (
          <View
            style={[
              styles.colorSwatch,
              {backgroundColor: option.colorHex},
              option.colorHex === '#FFFFFF' && styles.colorSwatchBorder,
            ]}
          />
        ) : null}

        {isRatingSection ? (
          <View style={styles.ratingRow}>
            <View style={styles.ratingStars}>
              {Array.from({length: 5}).map((_, index) => (
                <Ionicons
                  key={`${option.id}-star-${index}`}
                  name={index < (option.stars ?? 0) ? 'star' : 'star-outline'}
                  size={14}
                  color={COLORS.black}
                />
              ))}
            </View>
            <CustomText style={styles.optionLabel}>{option.label}</CustomText>
          </View>
        ) : (
          <View style={styles.optionLabelRow}>
            <CustomText style={styles.optionLabel}>{option.label}</CustomText>
            {option.countLabel ? (
              <CustomText style={styles.optionCount}>{option.countLabel}</CustomText>
            ) : null}
          </View>
        )}
      </View>

      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected ? <Ionicons name="checkmark" size={13} color={COLORS.black} /> : null}
      </View>
    </Pressable>
  );
};

const PriceRangeSection: React.FC<{
  draft: PlpFilterDraftState;
  setDraft: React.Dispatch<React.SetStateAction<PlpFilterDraftState>>;
}> = ({draft, setDraft}) => {
  const minPercent =
    ((draft.minPrice - PRICE_MIN_BOUND) / (PRICE_MAX_BOUND - PRICE_MIN_BOUND)) * 100;
  const maxPercent =
    ((draft.maxPrice - PRICE_MIN_BOUND) / (PRICE_MAX_BOUND - PRICE_MIN_BOUND)) * 100;

  const updateValue = (
    key: 'minPrice' | 'maxPrice',
    value: string,
    oppositeValue: number,
  ) => {
    const numeric = Number(value.replace(/[^0-9]/g, ''));
    if (Number.isNaN(numeric)) {
      return;
    }

    if (key === 'minPrice') {
      const clamped = Math.min(Math.max(PRICE_MIN_BOUND, numeric), oppositeValue);
      setDraft(current => ({...current, minPrice: clamped}));
      return;
    }

    const clamped = Math.max(Math.min(PRICE_MAX_BOUND, numeric), oppositeValue);
    setDraft(current => ({...current, maxPrice: clamped}));
  };

  return (
    <View style={styles.priceWrap}>
      <CustomText style={styles.priceTitle}>Set Price Range</CustomText>

      <View style={styles.priceTrack}>
        <View style={styles.priceTrackBase} />
        <View
          style={[
            styles.priceTrackFill,
            {
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            },
          ]}
        />
        <View style={[styles.priceThumb, {left: `${minPercent}%`}]} />
        <View style={[styles.priceThumb, {left: `${maxPercent}%`}]} />
      </View>

      <View style={styles.priceInputRow}>
        <PriceInput
          value={`${draft.minPrice}`}
          onChangeText={text => updateValue('minPrice', text, draft.maxPrice)}
          placeholder="0"
        />
        <View style={styles.priceInputDivider} />
        <PriceInput
          value={`${draft.maxPrice}`}
          onChangeText={text => updateValue('maxPrice', text, draft.minPrice)}
          placeholder="5000"
        />
      </View>
    </View>
  );
};

const PriceInput: React.FC<Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>> = ({
  value,
  onChangeText,
  placeholder,
}) => (
  <View style={styles.priceInputWrap}>
    <CustomText style={styles.currencyLabel}>$</CustomText>
    <TextInput
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.textMuted}
      style={styles.priceInput}
    />
  </View>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  leftRail: {
    width: 124,
    borderRightWidth: 1,
    borderRightColor: COLORS.extraLightGray,
    backgroundColor: COLORS.white,
  },
  railItem: {
    minHeight: 52,
    paddingHorizontal: SPACING.sm,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  railItemActive: {
    backgroundColor: '#FAFAFA',
  },
  railActiveMarker: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: COLORS.black,
  },
  railItemText: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  railItemTextActive: {
    fontFamily: fontFamilies.medium,
    color: COLORS.black,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchWrap: {
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    color: COLORS.black,
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    paddingVertical: 0,
  },
  optionScroll: {
    flex: 1,
  },
  optionScrollContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.massive,
  },
  optionRow: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: SPACING.sm,
  },
  optionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    flexWrap: 'wrap',
  },
  optionLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  optionCount: {
    fontFamily: fontFamilies.regular,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.disabled,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  colorSwatch: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: SPACING.sm,
  },
  colorSwatchBorder: {
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  priceWrap: {
    paddingTop: SPACING.md,
  },
  priceTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },
  priceTrack: {
    height: 24,
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  priceTrackBase: {
    height: 2,
    backgroundColor: COLORS.extraLightGray,
    borderRadius: 1,
  },
  priceTrackFill: {
    position: 'absolute',
    height: 2,
    backgroundColor: COLORS.black,
  },
  priceThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: -7,
    borderWidth: 2,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  priceInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  priceInputDivider: {
    width: 12,
    height: 1,
    backgroundColor: COLORS.extraLightGray,
  },
  priceInputWrap: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    borderColor: COLORS.extraLightGray,
    borderRadius: RADIUS.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
  },
  currencyLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: COLORS.black,
    marginRight: SPACING.xs,
  },
  priceInput: {
    flex: 1,
    color: COLORS.black,
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    paddingVertical: 0,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default React.memo(PlpFilterModal);
