import AdminTitle from "@/admin/components/AdminTitle";
import type { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import useProducts from "@/shop/hooks/useProducts";
import CustomFullScreenLoader from "@/components/custom/CustomFullScreenLoader";
import { currencyFormater } from "@/helpers/currency-formatter";

interface AdminProductsProps {}
const AdminProducts: FC<AdminProductsProps> = ({}) => {
  const { data, error, isLoading } = useProducts();

  if (isLoading)
    return (
      <>
        <CustomFullScreenLoader />
      </>
    );

  if (error) return <h1>Error al obtener los productos</h1>;

  if (data)
    return (
      <>
        <div className="flex justify-between  items-center">
          <AdminTitle
            title="Productos"
            subtitle="Aqui puedes ver y administrar todos tus productos"
          />
          <div className="flex justify-end mb-10 gap-4">
            <Link to="/admin/products/new">
              <Button>
                <PlusIcon />
                Nuevo Producto
              </Button>
            </Link>
          </div>
        </div>

        <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Inventario</TableHead>
              <TableHead>Tallas</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products &&
              data.products.map((product) => (
                <TableRow>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-20 h-20 object-cover roounded-md"
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`admin/product/${product.id}`}
                      className="hover:text-blue-500 hover:underline transition-all duration-300"
                    >
                      {product.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    {currencyFormater(product.price)}
                  </TableCell>
                  <TableCell className="text-right">{product.gender}</TableCell>
                  <TableCell className="text-right">{product.stock}</TableCell>
                  <TableCell className="text-right">
                    {product.sizes.join(", ")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/admin/products/${product.id}`}>
                      <PencilIcon className="w-4 h-4 text-blue-500" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <CustomPagination totalPages={data?.pages} />
      </>
    );
};

export default AdminProducts;
