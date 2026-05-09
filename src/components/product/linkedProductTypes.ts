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
}
