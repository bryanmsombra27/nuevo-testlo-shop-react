import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";

const useProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAction,
  });

  return {
    data,
    isLoading,
    error,
  };
};
export default useProducts;
