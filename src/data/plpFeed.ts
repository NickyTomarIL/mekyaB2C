import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
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
