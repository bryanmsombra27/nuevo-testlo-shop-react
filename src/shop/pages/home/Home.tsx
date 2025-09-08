import { CustomPagination } from "@/components/custom/CustomPagination";
import CustomJumbotron from "@/shop/components/CustomJumbotron";
import ProductsGrid from "@/shop/components/ProductsGrid";
import useProducts from "@/shop/hooks/useProducts";
import type { FC } from "react";

interface HomeProps {}
const Home: FC<HomeProps> = ({}) => {
  const { data, error, isLoading } = useProducts();
  if (isLoading) return <h1>loading...</h1>;

  if (error) return <h1>error...</h1>;

  if (data)
    return (
      <>
        <CustomJumbotron title="Todos los productos" />
        <ProductsGrid products={data.products ?? []} />
        <CustomPagination totalPages={data.pages} />
      </>
    );
};

export default Home;
