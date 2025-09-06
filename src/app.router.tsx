import { createBrowserRouter, Navigate } from "react-router";
import ShopLayout from "./shop/layout/ShopLayout";
import Home from "./shop/pages/home/Home";
import Product from "./shop/pages/product/Product";
import Gender from "./shop/pages/gender/Gender";
import Login from "./auth/pages/login/Login";
import Register from "./auth/pages/register/Register";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import AdminProducts from "./admin/pages/products/AdminProducts";
import AdminProduct from "./admin/pages/product/AdminProduct";
import { lazy } from "react";

const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product/:idSlug",
        element: <Product />,
      },
      {
        path: "gender/:gender",
        element: <Gender />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "products/:id",
        element: <AdminProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
