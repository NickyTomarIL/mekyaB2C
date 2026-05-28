import CustomText from '@/components/common/CustomText';
import COLORS from '@/constants/colors';
import {fontFamilies} from '@/constants/fonts';
import {RADIUS} from '@/theme/radius';
import {SPACING} from '@/theme/spacing';
import type {PdpSizeChartColumn, PdpSizeChartUnitTable} from '@/data/pdpSizeChart';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

type PdpSizeChartTableProps = {
  columns: ReadonlyArray<PdpSizeChartColumn>;
  table: PdpSizeChartUnitTable;
};

const UNIT_COL_WIDTH = 88;
const SIZE_COL_WIDTH = 44;

const PdpSizeChartTable: React.FC<PdpSizeChartTableProps> = ({columns, table}) => {
  const tableMinWidth = UNIT_COL_WIDTH + SIZE_COL_WIDTH * columns.length;

  return (
    <View style={styles.section}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{minWidth: tableMinWidth}}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <View style={[styles.unitCell, styles.unitCellHeader]}>
              <CustomText style={styles.unitLabel}>{table.unitLabel}</CustomText>
            </View>
            {columns.map(column => (
              <View key={column.id} style={styles.sizeHeaderCell}>
                <CustomText style={styles.sizeHeader}>{column.label}</CustomText>
              </View>
            ))}
          </View>

          {table.rows.map(row => (
            <View key={row.id} style={styles.dataRow}>
              <View style={[styles.unitCell, styles.rowLabelCell]}>
                <CustomText style={styles.rowLetter}>{row.letter}</CustomText>
                <CustomText style={styles.rowLabel}>{row.label}</CustomText>
              </View>
              {columns.map(column => {
                const value = row.valuesByColumnId[column.id];
                const formatted =
                  table.unit === 'centimeters'
                    ? value?.toFixed(0)
                    : value?.toFixed(1);
                return (
                  <View key={`${row.id}-${column.id}`} style={styles.valueCell}>
                    <CustomText style={styles.valueText}>{formatted ?? '—'}</CustomText>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: COLORS.extraLightGray,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.extraLightGray,
  },
  unitCell: {
    width: UNIT_COL_WIDTH,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    justifyContent: 'center',
    backgroundColor: '#EDEDED',
  },
  unitCellHeader: {
    borderTopLeftRadius: RADIUS.sm,
  },
  rowLabelCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.white,
  },
  unitLabel: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: COLORS.black,
  },
  sizeHeaderCell: {
    width: SIZE_COL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  sizeHeader: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: COLORS.black,
  },
  rowLetter: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: COLORS.black,
    width: 14,
  },
  rowLabel: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: COLORS.darkGray,
  },
  valueCell: {
    width: SIZE_COL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  valueText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
    color: COLORS.black,
  },
});

export default React.memo(PdpSizeChartTable);
