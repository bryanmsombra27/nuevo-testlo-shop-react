import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../actions/get-product-by-id.action";
import { createUpdateProductAction } from "../actions/create-update-product.action";
import { toast } from "sonner";

const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    // queryKey: ["product", id],
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const addProductMutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      toast.success(`el producto ${product.title} fue creado con exito`);
      // invalidar la query anterior
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      // actualizar el query data
      queryClient.setQueryData(["products", { id: product.id }], product);
    },
    onError: () => {
      toast.error("No fue posible crear el producto");
    },
  });

  return {
    data,
    isLoading,
    error,
    addProductMutation,
  };
};
export default useProduct;
