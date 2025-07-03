import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function UpdateClient({
  cedulaCliente,
  data,
}: {
  cedulaCliente: number;
  data: { nombreCliente: string; direccionCliente: string; telefonoCliente: number; };
}) {
  const response = await axios.patch(
    `http://localhost:8000/clientes/${cedulaCliente}`,
    data
  );
  return response.data;
}

export function UseUpdateClient() {
  return useMutation({ mutationFn: UpdateClient });
}
