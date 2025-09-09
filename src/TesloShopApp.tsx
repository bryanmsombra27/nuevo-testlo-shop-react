import type { FC } from "react";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();

interface TesloShopAppProps {}
const TesloShopApp: FC<TesloShopAppProps> = ({}) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          closeButton
          duration={1500}
        />
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default TesloShopApp;
