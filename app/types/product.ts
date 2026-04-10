export interface ProductImage {
  url: string;
}

export interface Product {
  uid: string;
  enName: string;
  posItemCode?: string;
  categoryUid?: string;
  category?: string;
  min?: number;
  max?: number;
  images: ProductImage[];
  sort?: ProductStockSort;
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
