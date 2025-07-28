import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function UpdateProduct({
  codigoProducto,
  data,
}: {
  codigoProducto: number;
  data: { nombreProducto: string; precioProducto: number };
}) {
  const response = await axios.patch(
    `https://backend-proyecto-ing-soft-ii.onrender.com/producto/${codigoProducto}`,
    data
  );
  return response.data;
}

export function UseUpdateProduct() {
  return useMutation({ mutationFn: UpdateProduct });
}
