import { CustomPagination } from "@/components/custom/CustomPagination";
import CustomJumbotron from "@/shop/components/CustomJumbotron";
import ProductsGrid from "@/shop/components/ProductsGrid";
import useProducts from "@/shop/hooks/useProducts";
import type { FC } from "react";
import { useParams } from "react-router";

interface GenderProps {}
const Gender: FC<GenderProps> = ({}) => {
  const { gender } = useParams();
  const { data, error, isLoading } = useProducts();

  const genderLabel =
    gender == "men" ? "Hombres" : gender == "women" ? "Mujeres" : "Niños";

  if (isLoading) return <h1>loading...</h1>;

  if (error) return <h1>error...</h1>;

  if (data)
    return (
      <>
        <CustomJumbotron title={`Productos para ${genderLabel}`} />
        <ProductsGrid products={data.products} />
        <CustomPagination totalPages={data.pages} />
      </>
    );
};

export default Gender;
