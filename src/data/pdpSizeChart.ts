export type PdpSizeChartColumn = {
  id: string;
  label: string;
};

export type PdpSizeChartRow = {
  id: string;
  letter: 'A' | 'B' | 'C';
  label: string;
  valuesByColumnId: Record<string, number>;
};

export type PdpSizeChartUnitTable = {
  unit: 'inches' | 'centimeters';
  unitLabel: string;
  rows: ReadonlyArray<PdpSizeChartRow>;
};

export type PdpSizeChartMeasurementStep = {
  letter: 'A' | 'B' | 'C';
  title: string;
  description: string;
};

export const PDP_SIZE_CHART_COLUMNS: ReadonlyArray<PdpSizeChartColumn> = [
  {id: 'size-s', label: 'S'},
  {id: 'size-m', label: 'M'},
  {id: 'size-l', label: 'L'},
  {id: 'size-xl', label: 'XL'},
  {id: 'size-2xl', label: '2XL'},
  {id: 'size-3xl', label: '3XL'},
];

const lengthValues = {
  'size-s': 25.2,
  'size-m': 26.0,
  'size-l': 26.8,
  'size-xl': 27.6,
  'size-2xl': 28.4,
  'size-3xl': 29.2,
};

const bustValues = {
  'size-s': 34.6,
  'size-m': 36.2,
  'size-l': 37.8,
  'size-xl': 39.4,
  'size-2xl': 41.0,
  'size-3xl': 42.6,
};

const shoulderValues = {
  'size-s': 14.9,
  'size-m': 15.4,
  'size-l': 15.9,
  'size-xl': 16.4,
  'size-2xl': 16.9,
  'size-3xl': 17.4,
};

const lengthValuesCm = {
  'size-s': 64,
  'size-m': 66,
  'size-l': 68,
  'size-xl': 70,
  'size-2xl': 72,
  'size-3xl': 74,
};

const bustValuesCm = {
  'size-s': 88,
  'size-m': 92,
  'size-l': 96,
  'size-xl': 100,
  'size-2xl': 104,
  'size-3xl': 108,
};

const shoulderValuesCm = {
  'size-s': 38,
  'size-m': 39,
  'size-l': 40,
  'size-xl': 41,
  'size-2xl': 42,
  'size-3xl': 43,
};

export const PDP_SIZE_CHART_INCHES_TABLE: PdpSizeChartUnitTable = {
  unit: 'inches',
  unitLabel: 'Inches',
  rows: [
    {
      id: 'row-length',
      letter: 'A',
      label: 'Length',
      valuesByColumnId: lengthValues,
    },
    {
      id: 'row-bust',
      letter: 'B',
      label: 'Bust',
      valuesByColumnId: bustValues,
    },
    {
      id: 'row-shoulder',
      letter: 'C',
      label: 'Shoulder',
      valuesByColumnId: shoulderValues,
    },
  ],
};

export const PDP_SIZE_CHART_CM_TABLE: PdpSizeChartUnitTable = {
  unit: 'centimeters',
  unitLabel: 'Centimeters',
  rows: [
    {
      id: 'row-length-cm',
      letter: 'A',
      label: 'Length',
      valuesByColumnId: lengthValuesCm,
    },
    {
      id: 'row-bust-cm',
      letter: 'B',
      label: 'Bust',
      valuesByColumnId: bustValuesCm,
    },
    {
      id: 'row-shoulder-cm',
      letter: 'C',
      label: 'Shoulder',
      valuesByColumnId: shoulderValuesCm,
    },
  ],
};

export const PDP_SIZE_CHART_TABLES: ReadonlyArray<PdpSizeChartUnitTable> = [
  PDP_SIZE_CHART_INCHES_TABLE,
  PDP_SIZE_CHART_CM_TABLE,
];

export const PDP_SIZE_CHART_TITLE = 'Size Chart';

export const PDP_SIZE_CHART_INSTRUCTIONS = {
  heading: 'Measuring T Shirt Size',
  intro:
    'Not sure about your t shirt size? Follow these simple steps to figure it out:',
  steps: [
    {
      letter: 'A',
      title: 'Length (A)',
      description:
        '– Measure from the top of the shoulder (where it meets the collar) straight down to the bottom hem.',
    },
    {
      letter: 'B',
      title: 'Shoulder (B)',
      description:
        '– Measure the shoulder at the back, from edge to edge with arms relaxed on both sides.',
    },
    {
      letter: 'C',
      title: 'Sleeve (C)',
      description:
        '– Measure from the shoulder seam through the outer arm to the cuff/hem.',
    },
  ] satisfies ReadonlyArray<PdpSizeChartMeasurementStep>,
};
