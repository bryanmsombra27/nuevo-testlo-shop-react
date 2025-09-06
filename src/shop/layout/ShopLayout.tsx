import type { FC } from "react";
import { Outlet } from "react-router";
import CustomHeader from "../components/CustomHeader";
import CustomFooter from "../components/CustomFooter";

interface ShopLayoutProps {}
const ShopLayout: FC<ShopLayoutProps> = ({}) => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeader />
      <Outlet />

      <CustomFooter />
    </div>
  );
};

export default ShopLayout;
