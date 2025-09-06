import CustomJumbotron from "@/shop/components/CustomJumbotron";
import type { FC } from "react";

interface HomeProps {}
const Home: FC<HomeProps> = ({}) => {
  return (
    <>
      <CustomJumbotron title="Todos los productos" />
    </>
  );
};

export default Home;
