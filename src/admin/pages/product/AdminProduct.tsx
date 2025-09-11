import type { FC } from "react";
import { useParams } from "react-router";
import useProduct from "@/admin/hooks/useProduct";
import CustomFullScreenLoader from "@/components/custom/CustomFullScreenLoader";
import ProductForm from "./ui/ProductForm";

interface AdminProductProps {}
const AdminProduct: FC<AdminProductProps> = ({}) => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(id!);

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  if (isLoading) return <CustomFullScreenLoader />;

  if (error) return <h1> Error al cargar producto </h1>;

  if (product)
    return (
      <ProductForm
        product={product}
        subtitle={productSubtitle}
        title={productTitle}
      />
    );
};

export default AdminProduct;
