import { tesloApi } from "@/api/teslo_api";
import type { ProductResponse } from "@/interfaces/products.response";

export const getProductsAction = async (): Promise<ProductResponse> => {
  const { data } = await tesloApi.get<ProductResponse>("/products");

  const productsWithImagesUrl = data?.products?.map((product) => {
    product.images = product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`
    );

    return product;
  });

  return {
    ...data,
    products: productsWithImagesUrl,
  };
};
