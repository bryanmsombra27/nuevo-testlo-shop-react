import type { FC, ReactNode } from "react";
import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import CustomFullScreenLoader from "./components/custom/CustomFullScreenLoader";
import { useAuthStore } from "./auth/store/auth.store";

// Create a client
const queryClient = new QueryClient();

interface CheckAuthProviderProps {
  children: ReactNode;
}
const CheckAuthProvider: FC<CheckAuthProviderProps> = ({ children }) => {
  const { checkAuthStatus } = useAuthStore();

  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 60 * 1.5,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <CustomFullScreenLoader />;

  return children;
};

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
        <CheckAuthProvider>
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default TesloShopApp;
