import { tesloApi } from "@/api/teslo_api";
import type { Product } from "@/interfaces/product.interface";
import { sleep } from "@/lib/sleep";

export const createUpdateProductAction = async (
  productLike: Partial<Product & { files?: File[] }>
): Promise<Product> => {
  const { id, user, images: image = [], files, ...rest } = productLike;

  await sleep(1500);

  const isCreating = id == "new";
  rest.stock = Number(rest.stock) || 0;
  rest.price = Number(rest.price) || 0;
  // PREPARAR IMAGENES
  if (files && files?.length > 0) {
    const imagesNames = await uploadFiles(files);
    image.push(...imagesNames);
  }

  const imagesToSave = image.map((image) =>
    image.includes("http") ? image.split("/").pop() : image
  );

  const { data } = await tesloApi<Product>({
    method: isCreating ? "POST" : "PATCH",
    url: isCreating ? "/products" : `/products/${id}`,
    data: {
      ...rest,
      images: imagesToSave,
    },
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

interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

export const uploadFiles = async (files: File[]) => {
  const uploadPromise = files.map(async (file) => {
    const formData = new FormData();

    formData.append(`file`, file);
    const { data } = await tesloApi.post<FileUploadResponse>(
      "/files/product/",
      formData
    );

    return data.fileName;
  });

  return await Promise.all(uploadPromise);
};
