import { tesloApi } from "@/api/teslo_api";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
  productLike: Partial<Product>
): Promise<Product> => {
  const { id, user, images: image = [], ...rest } = productLike;

  await sleep(1500);

  const isCreating = id == "new";
  rest.stock = Number(rest.stock) || 0;
  rest.price = Number(rest.price) || 0;

  const { data } = await tesloApi<Product>({
    method: isCreating ? "POST" : "PATCH",
    url: isCreating ? "/products" : `/products/${id}`,
    data: rest,
  });

  const images = data.images.map((image) =>
    image.includes("http")
      ? image
      : `${import.meta.env.VITE_API_URL}/files/product/${image}`
  );

  return {
    ...data,
    images,
  };
};
