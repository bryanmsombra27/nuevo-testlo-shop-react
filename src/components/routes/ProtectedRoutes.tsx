import { useAuthStore } from "@/auth/store/auth.store";
import type { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRoutesProps {
  children: ReactNode;
}
export const AutenthicatedRoutes: FC<ProtectedRoutesProps> = ({ children }) => {
  const { authStatus } = useAuthStore();
  if (authStatus == "checking") {
    return null;
  }

  return authStatus == "not-authenticated" ? (
    <Navigate to="/auth/login" />
  ) : (
    children
  );
};

export const NotAutenthicatedRoutes: FC<ProtectedRoutesProps> = ({
  children,
}) => {
  const { authStatus } = useAuthStore();
  if (authStatus == "checking") {
    return null;
  }

  return authStatus == "authenticated" ? <Navigate to="/" /> : children;
};

export const AdminRoute: FC<ProtectedRoutesProps> = ({ children }) => {
  const { authStatus, isAdmin } = useAuthStore();
  if (authStatus == "checking") {
    return null;
  }
  if (authStatus == "not-authenticated") {
    return <Navigate to="/auth/login" />;
  }
  if (!isAdmin()) return <Navigate to="/" />;

  return children;
};
