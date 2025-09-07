import type { FC } from "react";
import { Outlet } from "react-router";

interface AuthLayoutProps {}
const AuthLayout: FC<AuthLayoutProps> = ({}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
