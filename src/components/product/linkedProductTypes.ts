import type {ImageSourcePropType} from 'react-native';

/**
 * Data for one linked product tile in the horizontal carousel.
 */
export interface LinkedProductItem {
  id: string;
  title: string;
  /** Hex colors for visible swatches (first N shown, rest implied by moreColorsCount). */
  swatchColors: string[];
  /** Extra swatches not shown (e.g. 5 when 5 circles shown + "+5 more"). */
  moreColorsCount?: number;
  price: string;
  mrp: string;
  discount: string;
  rating: string;
  /** When set, shown as the product photo instead of the placeholder. */
  imageSource?: ImageSourcePropType;
  /** Shown below the rating when set (e.g. Fresh Finds). */
  brandName?: string;
}
