export interface ProductImage {
  url: string;
}

export interface Product {
  uid: string;
  enName: string;
  images: ProductImage[];
}
