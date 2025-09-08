import type { User } from "./user.interface";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export type Gender = "kid" | "women" | "men" | "unisex";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
