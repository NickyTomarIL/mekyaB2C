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

export type PlpSortOption = {
  id: string;
  label: string;
};

export const PLP_SORT_OPTIONS: ReadonlyArray<PlpSortOption> = [
  {id: 'newest', label: 'Newest'},
  {id: 'priceLowToHigh', label: 'Price - Low to High'},
  {id: 'priceHighToLow', label: 'Price - High to Low'},
  {id: 'popularity', label: 'Popularity'},
  {id: 'bestRated', label: 'Best Rated'},
];

export const PLP_DEFAULT_SORT_ID = 'newest';

export type PlpFilterSectionKey =
  | 'categories'
  | 'size'
  | 'colors'
  | 'brands'
  | 'fabric'
  | 'rating'
  | 'priceRange'
  | 'discount';

export type PlpFilterOption = {
  id: string;
  label: string;
  countLabel?: string;
  colorHex?: string;
  /** For rating rows like 5.0, 4.0, etc. */
  stars?: number;
};

export type PlpFilterSectionConfig = {
  key: PlpFilterSectionKey;
  title: string;
  searchPlaceholder?: string;
  options: ReadonlyArray<PlpFilterOption>;
};

export const PLP_FILTER_SECTION_ORDER: ReadonlyArray<{
  key: PlpFilterSectionKey;
  title: string;
}> = [
  {key: 'categories', title: 'Categories'},
  {key: 'size', title: 'Size'},
  {key: 'colors', title: 'Colors'},
  {key: 'brands', title: 'Brands'},
  {key: 'fabric', title: 'Fabric'},
  {key: 'rating', title: 'Rating'},
  {key: 'priceRange', title: 'Price Range'},
  {key: 'discount', title: 'Discount'},
];

export const PLP_FILTER_CONFIG: Record<PlpFilterSectionKey, PlpFilterSectionConfig> =
  {
    categories: {
      key: 'categories',
      title: 'Categories',
      searchPlaceholder: 'Search for categories',
      options: [
        {id: 'cat-shirts', label: 'Shirts'},
        {id: 'cat-shorts', label: 'Shorts'},
        {id: 'cat-trousers', label: 'Trousers & Chinos'},
        {id: 'cat-polos', label: 'T-Shirts & Polos'},
        {id: 'cat-shirts-2', label: 'Shirts'},
        {id: 'cat-shorts-2', label: 'Shorts'},
        {id: 'cat-trousers-2', label: 'Trousers & Chinos'},
        {id: 'cat-shorts-3', label: 'shorts'},
      ],
    },
    size: {
      key: 'size',
      title: 'Size',
      options: [
        {id: 'size-xs', label: 'XS'},
        {id: 'size-s', label: 'S'},
        {id: 'size-m', label: 'M'},
        {id: 'size-l', label: 'L'},
        {id: 'size-xl', label: 'XL'},
        {id: 'size-xxl', label: 'XXL'},
        {id: 'size-xxxl', label: 'XXXL'},
      ],
    },
    colors: {
      key: 'colors',
      title: 'Colors',
      options: [
        {id: 'color-red', label: 'Red', countLabel: '(250)', colorHex: '#FF0000'},
        {id: 'color-green', label: 'Green', countLabel: '(250)', colorHex: '#28FF06'},
        {id: 'color-blue', label: 'Blue', countLabel: '(250)', colorHex: '#0095FF'},
        {id: 'color-pink', label: 'Pink', countLabel: '(250)', colorHex: '#FF00FF'},
        {id: 'color-white', label: 'White', countLabel: '(250)', colorHex: '#FFFFFF'},
        {id: 'color-black', label: 'Black', countLabel: '(250)', colorHex: '#000000'},
        {id: 'color-yellow', label: 'Yellow', countLabel: '(250)', colorHex: '#FFD600'},
      ],
    },
    brands: {
      key: 'brands',
      title: 'Brands',
      searchPlaceholder: 'Search for Brands',
      options: [
        {id: 'brand-workshop', label: 'The Workshop Studio'},
        {id: 'brand-riwayat', label: 'Riwayat Couture'},
        {id: 'brand-zarqa', label: 'Zarqa by Mehra'},
        {id: 'brand-karigari', label: 'Karigari Looms'},
        {id: 'brand-neelvastra', label: 'Neelvastra'},
        {id: 'brand-tanabana', label: 'TanaBana India'},
      ],
    },
    fabric: {
      key: 'fabric',
      title: 'Fabric',
      options: [
        {id: 'fabric-wool', label: 'Wool'},
        {id: 'fabric-polyester', label: 'Polyester'},
        {id: 'fabric-linen', label: 'Linen'},
        {id: 'fabric-cotton', label: 'Cotton'},
        {id: 'fabric-silk', label: 'Silk'},
        {id: 'fabric-nylon', label: 'Nylon'},
        {id: 'fabric-khadi', label: 'Khadi'},
        {id: 'fabric-brocade', label: 'Banarasi Brocade'},
        {id: 'fabric-tussar', label: 'Tussar Silk'},
        {id: 'fabric-ajrakh', label: 'Ajrakh'},
      ],
    },
    rating: {
      key: 'rating',
      title: 'Rating',
      options: [
        {id: 'rating-5', label: '5.0', stars: 5},
        {id: 'rating-4', label: '4.0', stars: 4},
        {id: 'rating-3', label: '3.0', stars: 3},
        {id: 'rating-2', label: '2.0', stars: 2},
        {id: 'rating-1', label: '1.0', stars: 1},
      ],
    },
    priceRange: {
      key: 'priceRange',
      title: 'Price Range',
      options: [],
    },
    discount: {
      key: 'discount',
      title: 'Discount',
      options: [
        {id: 'discount-10', label: '10%'},
        {id: 'discount-20', label: '20%'},
        {id: 'discount-30', label: '30%'},
        {id: 'discount-40', label: '40%'},
        {id: 'discount-50', label: '50%'},
      ],
    },
  };

export type PlpFilterDraftState = {
  activeSection: PlpFilterSectionKey;
  selectedBySection: Partial<Record<PlpFilterSectionKey, string[]>>;
  minPrice: number;
  maxPrice: number;
};

export const PLP_FILTER_DEFAULTS: PlpFilterDraftState = {
  activeSection: 'categories',
  selectedBySection: {
    colors: ['color-red'],
  },
  minPrice: 500,
  maxPrice: 500,
};

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
