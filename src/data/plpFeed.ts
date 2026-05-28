import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
import type {ImageSourcePropType} from 'react-native';
import {FRESH_FINDS_ITEMS, JACKET_GRID_ITEMS} from '@/data/homeDiscoverFeed';

const PLP_BASE_ITEMS: ReadonlyArray<LinkedProductItem> = [
  ...FRESH_FINDS_ITEMS,
  ...JACKET_GRID_ITEMS,
];

function duplicateItems(batchIndex: number): LinkedProductItem[] {
  return PLP_BASE_ITEMS.map(item => ({
    ...item,
    id: `plp-${batchIndex}-${item.id}`,
  }));
}

export const PLP_PRODUCTS: LinkedProductItem[] = [
  ...duplicateItems(1),
  ...duplicateItems(2),
  ...duplicateItems(3),
];

export const PLP_FILTER_CHIPS: ReadonlyArray<string> = [
  'Filter',
  'Size',
  'Brand',
  'Color',
];

export type PlpHeroBannerItem = {
  id: string;
  image: ImageSourcePropType;
  leftTopLabel: string;
  rightTopLabel: string;
  title: string;
  subtitle: string;
};

export const PLP_HERO_BANNERS: ReadonlyArray<PlpHeroBannerItem> = [
  {
    id: 'plp-hero-1',
    image: require('@/assets/images/homeBanner.png'),
    leftTopLabel: 'GENERAL\nACCESS STARTS\nAT 12PM',
    rightTopLabel: 'MEMBER\nEARLY ACCESS\nNOW LIVE',
    title: "KURAMA'S FURY",
    subtitle: 'UNLEASH THE TRUE POWER\nOF JINCHURIKI',
  },
  {
    id: 'plp-hero-2',
    image: require('@/assets/images/seasonImage4.jpg'),
    leftTopLabel: 'GENERAL\nACCESS STARTS\nAT 12PM',
    rightTopLabel: 'MEMBER\nEARLY ACCESS\nNOW LIVE',
    title: 'NEW DROP LIVE',
    subtitle: 'LIMITED STYLES\nNOW STREAMING',
  },
  {
    id: 'plp-hero-3',
    image: require('@/assets/images/men3.png'),
    leftTopLabel: 'GENERAL\nACCESS STARTS\nAT 12PM',
    rightTopLabel: 'MEMBER\nEARLY ACCESS\nNOW LIVE',
    title: 'SIGNATURE EDIT',
    subtitle: 'FRESH LOOKS FOR\nTHE NEW SEASON',
  },
];
