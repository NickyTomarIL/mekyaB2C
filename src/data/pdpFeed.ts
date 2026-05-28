import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
import type {ImageSourcePropType} from 'react-native';

export type PdpGalleryImage = {
  id: string;
  image: ImageSourcePropType;
};

export type PdpBreadcrumb = {
  id: string;
  label: string;
};

export type PdpColorOption = {
  id: string;
  name: string;
  hex: string;
};

export type PdpSizeOption = {
  id: string;
  label: string;
};

export type PdpFeatureBadge = {
  id: string;
  iconKey: 'cotton' | 'fit' | 'delivery';
  label: string;
};

export type PdpAccordionItem = {
  id: string;
  title: string;
  body: string;
};

export type PdpRatingBreakdownItem = {
  stars: number;
  count: number;
};

export type PdpReviewItem = {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  isVerifiedBuyer?: boolean;
};

export type PdpPrimaryProduct = {
  id: string;
  brand: string;
  title: string;
  price: string;
  mrp?: string;
  discount?: string;
  ratingLabel: string;
  ratingCountLabel: string;
  reviewCount: number;
};

export const PDP_BREADCRUMBS: ReadonlyArray<PdpBreadcrumb> = [
  {id: 'bc-home', label: 'Home'},
  {id: 'bc-men', label: 'Men'},
  {id: 'bc-tops', label: 'Tops'},
  {id: 'bc-tees', label: 'T-Shirts'},
];

export const PDP_GALLERY_IMAGES: ReadonlyArray<PdpGalleryImage> = [
  {id: 'pdp-gallery-1', image: require('@/assets/images/men3.png')},
  {id: 'pdp-gallery-2', image: require('@/assets/images/men2.png')},
  {id: 'pdp-gallery-3', image: require('@/assets/images/jacket1.png')},
  {id: 'pdp-gallery-4', image: require('@/assets/images/jacket2.png')},
  {id: 'pdp-gallery-5', image: require('@/assets/images/jacket3.png')},
  {id: 'pdp-gallery-6', image: require('@/assets/images/girl1.jpg')},
];

export const PDP_PRIMARY_PRODUCT: PdpPrimaryProduct = {
  id: 'pdp-tee-001',
  brand: 'ALLEN SOLLY',
  title: 'Premium Cotton Crew Neck T-Shirt',
  price: '₹549',
  mrp: '₹849',
  discount: '(10% off)',
  ratingLabel: '4.5',
  ratingCountLabel: '(243 Reviews)',
  reviewCount: 243,
};

export const PDP_COLOR_OPTIONS: ReadonlyArray<PdpColorOption> = [
  {id: 'pdp-color-grey', name: 'Grey', hex: '#9CA3AF'},
  {id: 'pdp-color-white', name: 'White', hex: '#FFFFFF'},
  {id: 'pdp-color-pink', name: 'Pink', hex: '#F9A8D4'},
  {id: 'pdp-color-green', name: 'Green', hex: '#86EFAC'},
];

export const PDP_SIZE_OPTIONS: ReadonlyArray<PdpSizeOption> = [
  {id: 'pdp-size-xs', label: 'XS'},
  {id: 'pdp-size-s', label: 'S'},
  {id: 'pdp-size-m', label: 'M'},
  {id: 'pdp-size-l', label: 'L'},
  {id: 'pdp-size-xl', label: 'XL'},
  {id: 'pdp-size-xxl', label: 'XXL'},
];

export const PDP_DEFAULT_SELECTIONS = {
  colorId: 'pdp-color-white',
  sizeId: 'pdp-size-m',
} as const;

export const PDP_PICKUP_LABEL = 'Pick up in Store - Choose your store';
export const PDP_DELIVERY_ZIP = '10001';
export const PDP_DELIVERY_NOTE =
  'Free shipping on orders over ₹999 · Easy 30-day returns · Delivery in 3-5 business days';

export const PDP_FEATURE_BADGES: ReadonlyArray<PdpFeatureBadge> = [
  {id: 'pdp-feature-cotton', iconKey: 'cotton', label: '100% Cotton'},
  {id: 'pdp-feature-fit', iconKey: 'fit', label: 'Regular Fit'},
  {id: 'pdp-feature-delivery', iconKey: 'delivery', label: 'Free Delivery'},
];

export const PDP_DETAILS_ACCORDIONS: ReadonlyArray<PdpAccordionItem> = [
  {
    id: 'pdp-accordion-description',
    title: 'Product Description',
    body: 'Premium 100% cotton knit with breathable finish. Soft touch, anti-pilling treatment, and durable stitching for everyday wear.',
  },
  {
    id: 'pdp-accordion-care',
    title: 'Material & Care',
    body: 'Machine wash cold. Wash with similar colors. Do not bleach. Tumble dry low. Warm iron if needed.',
  },
  {
    id: 'pdp-accordion-shipping',
    title: 'Shipping & Returns',
    body: 'Ships within 24 hours. Free shipping on orders over ₹999. Easy 30-day return and exchange available.',
  },
];

export const PDP_RATING_SUMMARY = {
  average: 4.5,
  totalRatings: 243,
};

export const PDP_RATING_BREAKDOWN: ReadonlyArray<PdpRatingBreakdownItem> = [
  {stars: 5, count: 168},
  {stars: 4, count: 52},
  {stars: 3, count: 14},
  {stars: 2, count: 6},
  {stars: 1, count: 3},
];

export const PDP_REVIEW_SORT_OPTIONS = [
  'Most Recent',
  'Highest Rated',
  'Lowest Rated',
] as const;

export type PdpReviewSortOption = (typeof PDP_REVIEW_SORT_OPTIONS)[number];

export const PDP_REVIEWS: ReadonlyArray<PdpReviewItem> = [
  {
    id: 'pdp-review-1',
    userName: 'Sarah M.',
    rating: 5,
    date: '12 Apr 2026',
    title: 'Perfect everyday tee',
    body: 'Fabric feels premium and the fit is exactly as described. True to size and very comfortable.',
    isVerifiedBuyer: true,
  },
  {
    id: 'pdp-review-2',
    userName: 'James K.',
    rating: 4,
    date: '06 Apr 2026',
    title: 'Great quality',
    body: 'Soft cotton and nice stitching. Delivery was quick and packaging was good.',
    isVerifiedBuyer: true,
  },
];

export const PDP_REVIEW_PAGE_COUNT = 3;

export const PDP_PEOPLE_ALSO_BOUGHT: ReadonlyArray<LinkedProductItem> = [
  {
    id: 'pdp-pab-1',
    title: 'Round Neck Long Sleeve Fitted Knit...',
    swatchColors: ['#1a1a1a', '#C4A574', '#9CA3AF', '#E8E0D5'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    imageSource: require('@/assets/images/girl1.jpg'),
    brandName: 'Allen Solly',
  },
  {
    id: 'pdp-pab-2',
    title: 'Round Neck Long Sleeve Fitted Knit...',
    swatchColors: ['#1a1a1a', '#C4A574', '#9CA3AF'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    imageSource: require('@/assets/images/girl2.jpg'),
    brandName: 'Allen Solly',
  },
  {
    id: 'pdp-pab-3',
    title: 'Round Neck Long Sleeve Fitted Knit...',
    swatchColors: ['#1a1a1a', '#FFFFFF'],
    moreColorsCount: 3,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '4.8',
    imageSource: require('@/assets/images/girl3.jpg'),
    brandName: 'Allen Solly',
  },
];

export const PDP_YOU_MAY_ALSO_LIKE: ReadonlyArray<LinkedProductItem> = [
  {
    id: 'pdp-yml-1',
    title: 'Daily Cotton Crew - White',
    swatchColors: ['#FFFFFF', '#111111', '#004B5E'],
    moreColorsCount: 1,
    price: '₹999',
    mrp: 'MRP ₹1,399',
    discount: '(29% off)',
    rating: '4.2',
    imageSource: require('@/assets/images/men2.png'),
    brandName: 'Allen Solly',
  },
  {
    id: 'pdp-yml-2',
    title: 'Solid V-Neck - Black',
    swatchColors: ['#000000', '#FFFFFF'],
    moreColorsCount: 2,
    price: '₹1,199',
    mrp: 'MRP ₹1,699',
    discount: '(29% off)',
    rating: '4.4',
    imageSource: require('@/assets/images/men3.png'),
    brandName: 'Allen Solly',
  },
  {
    id: 'pdp-yml-3',
    title: 'Printed Street Tee',
    swatchColors: ['#111111', '#EF4444', '#FFFFFF'],
    moreColorsCount: 2,
    price: '₹1,299',
    mrp: 'MRP ₹1,799',
    discount: '(28% off)',
    rating: '4.1',
    imageSource: require('@/assets/images/jacket3.png'),
    brandName: 'Allen Solly',
  },
];

/** @deprecated Use PDP_PEOPLE_ALSO_BOUGHT */
export const PDP_RECOMMENDED_PRODUCTS = PDP_PEOPLE_ALSO_BOUGHT;

/** @deprecated Use PDP_YOU_MAY_ALSO_LIKE */
export const PDP_RECENTLY_VIEWED_PRODUCTS = PDP_YOU_MAY_ALSO_LIKE;
