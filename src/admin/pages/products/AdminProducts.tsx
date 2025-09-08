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
import { PlusIcon } from "lucide-react";

interface AdminProductsProps {}
const AdminProducts: FC<AdminProductsProps> = ({}) => {
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
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>
              <img
                src="https://placehold.co/250*250"
                alt="koso"
                className="w-20 h-20 object-cover roounded-md"
              />
            </TableCell>
            <TableCell>Producto 1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">Categoria 1</TableCell>
            <TableCell className="text-right">30</TableCell>
            <TableCell className="text-right">XS,S,L</TableCell>
            <TableCell className="text-right">
              <Link to={`/admin/products/1`}>Editar</Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <CustomPagination totalPages={5} />
    </>
  );
};

export default AdminProducts;
