import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addSupplier = {
  rifProveedor: number;
  nombreProveedor: string;
  emailProveedor: string;
  telefonoProveedor: string;
  direccionProveedor: string;
};

async function AddSupplierFN(supplier: addSupplier) {
  const response = await axios.post(
    "http://127.0.0.1:8000/proveedores/",
    supplier
  );

  return response.data;
}

export const UseAddSupplier = () => useMutation({ mutationFn: AddSupplierFN });
