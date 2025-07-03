import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addClient = {
  nombreCliente: string;
  cedulaCliente: number;
  telefonoCliente: number;
  direccionCliente: string;
};

async function AddClient(data: addClient) {
  const response = await axios.post("http://127.0.0.1:8000/clientes/", data);

  return response.data;
}

export const UseAddClient = () => useMutation({ mutationFn: AddClient });