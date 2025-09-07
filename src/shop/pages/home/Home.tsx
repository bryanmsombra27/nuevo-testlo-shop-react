import { CustomPagination } from "@/components/custom/CustomPagination";
import { products } from "@/mocks/products.mock";
import CustomJumbotron from "@/shop/components/CustomJumbotron";
import ProductsGrid from "@/shop/components/ProductsGrid";
import type { FC } from "react";

interface HomeProps {}
const Home: FC<HomeProps> = ({}) => {
  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={5} />
    </>
  );
};

export default Home;
