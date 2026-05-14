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
