import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import CustomJumbotron from "@/shop/components/CustomJumbotron";
import ProductsGrid from "@/shop/components/ProductsGrid";
import type { FC } from "react";
import { useParams } from "react-router";

interface GenderProps {}
const Gender: FC<GenderProps> = ({}) => {
  const { gender } = useParams();

  const genderLabel =
    gender == "men" ? "Hombres" : gender == "women" ? "Mujeres" : "Niños";

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={5} />
    </>
  );
};

export default Gender;
