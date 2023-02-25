export interface Product {
  id: string;
  name: string;
  stock: number;
  unit_price: number;
  unit_measure: string;
  category: string;
  total_purchases: number;
  date_expiration: Date;
  image_url: string;
}
