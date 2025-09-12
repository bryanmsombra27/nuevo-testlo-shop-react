import type { FC } from "react";
import { useNavigate, useParams } from "react-router";
import useProduct from "@/admin/hooks/useProduct";
import CustomFullScreenLoader from "@/components/custom/CustomFullScreenLoader";
import ProductForm from "./ui/ProductForm";
import type { Product } from "@/interfaces/product.interface";

interface AdminProductProps {}
const AdminProduct: FC<AdminProductProps> = ({}) => {
  const { id } = useParams();
  const {
    data: product,
    error,
    isLoading,
    addProductMutation: { mutateAsync, isPending },
  } = useProduct(id!);
  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const navigate = useNavigate();

  const handleSubmitForm = async (
    productLike: Partial<Product & { files?: File[] }>
  ) => {
    const product = await mutateAsync(productLike);

    if (product) {
      navigate(`/admin/products/${product.id}`);
    }
  };

  if (isLoading) return <CustomFullScreenLoader />;

  if (error) return <h1> Error al cargar producto </h1>;

  if (product)
    return (
      <ProductForm
        product={product}
        subtitle={productSubtitle}
        title={productTitle}
        handleSubmitForm={handleSubmitForm}
        isPending={isPending}
      />
    );
};

export default AdminProduct;
