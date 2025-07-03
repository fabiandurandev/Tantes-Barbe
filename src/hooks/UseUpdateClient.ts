import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type dataClientType = {
  nombreCliente: string;
  cedulaCliente: number;
  direccionCliente: string;
  telefonoCliente: string;
};

async function UpdateClient({
  cedulaCliente,
  data,
}: {
  cedulaCliente: number;
  data: dataClientType;
}) {
  const response = await axios.patch(
    `http://127.0.0.1:8000/clientes/${cedulaCliente}`,
    data
  );
  return response.data;
}

export function UseUpdateClient() {
  return useMutation({ mutationFn: UpdateClient });
}
