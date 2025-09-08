import type { Product } from "./product.interface";

export interface ProductResponse {
  count: number;
  pages: number;
  products: Product[];
}
