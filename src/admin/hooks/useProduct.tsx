import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../actions/get-product-by-id.action";

const useProduct = (id: string) => {
  const { data, isLoading, error } = useQuery({
    // queryKey: ["product", id],
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data,
    isLoading,
    error,
  };
};
export default useProduct;
