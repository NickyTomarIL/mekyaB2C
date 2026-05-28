import type {LinkedProductItem} from '@/components/product/linkedProductTypes';
import type {ImageSourcePropType} from 'react-native';

export const FRESH_FINDS_ITEMS: LinkedProductItem[] = [
  {
    id: 'fresh-1',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/girl1.jpg'),
  },
  {
    id: 'fresh-2',
    title: 'Pure Cotton Slim Fit Casual Shirt',
    swatchColors: ['#2563eb', '#1a1a1a', '#78716c'],
    moreColorsCount: 3,
    price: '₹649',
    mrp: 'MRP ₹899',
    discount: '(8% off)',
    rating: '4.8',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/girl2.jpg'),
  },
  {
    id: 'fresh-3',
    title: 'Relaxed Fit Organic Cotton Hoodie',
    swatchColors: ['#365314', '#d4d4d4', '#171717'],
    moreColorsCount: 4,
    price: '₹899',
    mrp: 'MRP ₹1,199',
    discount: '(12% off)',
    rating: '4.9',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/girl3.jpg'),
  },
];

export type SpotlightReelItem = {
  id: string;
  thumbnail: ImageSourcePropType;
  creatorName: string;
  caption: string;
};

/** Shared reel strip items (Watch & Wear on Home, In The Spotlight on Reels). */
export const SPOTLIGHT_REEL_ITEMS: SpotlightReelItem[] = [
  {
    id: 'spot-1',
    thumbnail: require('@/assets/images/seasonImage1.jpg'),
    creatorName: 'Allen Solly',
    caption:
      'Midweight, Midweight+, Heavyweight — which one is your next hoodie grail?',
  },
  {
    id: 'spot-2',
    thumbnail: require('@/assets/images/seasonImage2.jpg'),
    creatorName: 'H&M',
    caption: 'Winter layers that move with you — shop the edit.',
  },
  {
    id: 'spot-3',
    thumbnail: require('@/assets/images/seasonImage3.jpg'),
    creatorName: 'The Workshop Studio',
    caption: 'Coats worth the double-take. Tap to watch the full reel.',
  },
];

/** Home jacket grid tiles. */
export const JACKET_GRID_ITEMS: LinkedProductItem[] = [
  {
    id: 'jacket-grid-1',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket1.png'),
  },
  {
    id: 'jacket-grid-2',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket2.png'),
  },
  {
    id: 'jacket-grid-3',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket3.png'),
  },
  {
    id: 'jacket-grid-4',
    title: 'Round Neck Long Sleeve Fitted Knit Topcsdd',
    swatchColors: ['#1a1a1a', '#C4A574', '#6B7280', '#1e3a5f'],
    moreColorsCount: 5,
    price: '₹549',
    mrp: 'MRP ₹849',
    discount: '(10% off)',
    rating: '5.0',
    brandName: 'The Workshop Studio',
    imageSource: require('@/assets/images/jacket1.png'),
  },
];

export const HERO_SLIDES: ReadonlyArray<{title: string; subtitle: string}> = [
  {
    title: 'Make An Entrance',
    subtitle: 'Be the best-dressed person in every room you enter',
  },
  {
    title: 'New Arrivals',
    subtitle: 'Fresh styles for the season ahead',
  },
  {
    title: 'Sustainable Style',
    subtitle: 'Thoughtfully made pieces you can feel good in',
  },
];

export type FeaturedCategoryItem = {
  id: string;
  title: string;
  cta: string;
  image: ImageSourcePropType;
};

export const FEATURED_CATEGORIES: ReadonlyArray<FeaturedCategoryItem> = [
  {
    id: 'cashmere',
    title: 'Recycled Cashmere',
    cta: 'Shop Women',
    image: require('@/assets/images/girl1.jpg'),
  },
  {
    id: 'coats',
    title: 'Coats & Jackets',
    cta: 'Shop Men',
    image: require('@/assets/images/girl2.jpg'),
  },
  {
    id: 'hoodies',
    title: 'Organic Cotton Hoodies',
    cta: 'Shop Now',
    image: require('@/assets/images/girl3.jpg'),
  },
];

/** New fall collection visual assets. */
export const NEW_FALL_TOP_IMAGES: ReadonlyArray<ImageSourcePropType> = [
  require('@/assets/images/seasonImage1.jpg'),
  require('@/assets/images/seasonImage2.jpg'),
  require('@/assets/images/seasonImage3.jpg'),
];

export const NEW_FALL_HERO_IMAGE = require('@/assets/images/seasonImage4.jpg');
