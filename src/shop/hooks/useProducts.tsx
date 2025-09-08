import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/get-products.action";
import { useParams, useSearchParams } from "react-router";

const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const limit = searchParams.get("limit") || 9;
  const page = searchParams.get("page") || 1;
  const price = searchParams.get("page") || "any";
  const offset = (+page - 1) * +limit;
  const sizes = searchParams.get("sizes") || [];
  const query = searchParams.get("query") || "";
  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "any":
      break;
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;

    default:
      break;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "products",
      { offset, limit, gender, sizes, minPrice, maxPrice, query },
    ],
    staleTime: 1000 * 60 * 5,
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
        gender,
        sizes,
        minPrice,
        maxPrice,
        query,
      }),
  });

  return {
    data,
    isLoading,
    error,
  };
};
export default useProducts;
