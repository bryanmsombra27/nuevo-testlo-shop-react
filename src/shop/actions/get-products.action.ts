import { tesloApi } from "@/api/teslo_api";
import type { ProductResponse } from "@/interfaces/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  gender?: string;
  sizes?: string | never[];
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  query?: string;
}

export const getProductsAction = async (
  options: Options
): Promise<ProductResponse> => {
  const { limit, offset, gender, sizes, maxPrice, minPrice, query } = options;

  const { data } = await tesloApi.get<ProductResponse>("/products", {
    params: {
      limit,
      offset,
      gender,
      sizes,
      minPrice,
      maxPrice,
      q: query,
    },
  });

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
