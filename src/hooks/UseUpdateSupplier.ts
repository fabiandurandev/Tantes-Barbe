import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type dataSupplier = {
  emailProveedor: string;
  direccionProveedor: string;
  nombreProveedor: string;
  telefonoProveedor: string;
};

async function UpdateSupplier({
  rifProveedor,
  data,
}: {
  rifProveedor: number;
  data: dataSupplier;
}) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/proveedor/${rifProveedor}`,
    data
  );
  return response.data;
}

export function UseUpdateSupplier() {
  return useMutation({ mutationFn: UpdateSupplier });
}
