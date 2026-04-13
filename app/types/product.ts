export interface ProductImage {
  url: string;
}

export interface Product {
  uid: string;
  enName: string;
  images: ProductImage[];
  image?: string;
  name?: string;
  price?: number;
  quantity?: number;
}

export interface Discount {
  amount: number; // flat value or percentage
  type: "flat" | "percentage";
  value: number; // pre-calculated selling price
}

export enum ProductStockSort {
  NONE = "NONE",
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
}
