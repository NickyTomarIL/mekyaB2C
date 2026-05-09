export interface ProfileOrder {
  id: string;
  orderNumber: string;
  purchasedOn: string;
  productName: string;
  productBrand: string;
  color: string;
  size: string;
  qty: string;
  price: string;
  statusLabel: string;
  statusTone: 'success' | 'neutral';
}
