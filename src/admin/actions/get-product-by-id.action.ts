import { tesloApi } from "@/api/teslo_api";
import type { Product } from "@/interfaces/product.interface";

export const getProductById = async (id: string): Promise<Product> => {
  if (id == "new") {
    return {
      id: "new",
      description: "",
      gender: "unisex",
      images: [],
      price: 0,
      sizes: [],
      slug: "",
      stock: 0,
      title: "",
      tags: [],
    } as unknown as Product;
  }

  const { data } = await tesloApi.get<Product>(`/products/${id}`);

  const images = data.images.map(
    (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
  );

  return {
    ...data,
    images,
  };
};
