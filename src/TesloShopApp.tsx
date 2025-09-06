import type { FC } from "react";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

interface TesloShopAppProps {}
const TesloShopApp: FC<TesloShopAppProps> = ({}) => {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
};

export default TesloShopApp;
