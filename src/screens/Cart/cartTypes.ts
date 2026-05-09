export interface CartLineItem {
  id: string;
  brand: string;
  description: string;
  priceLabel: string;
  mrpLabel: string;
  discountLabel: string;
  size: string;
  qty: number;
}

export interface CartPriceBreakdown {
  itemCount: number;
  totalMrp: string;
  discountOnMrp: string;
  couponDiscount: string;
  shippingCharges: string;
  totalAmount: string;
}
