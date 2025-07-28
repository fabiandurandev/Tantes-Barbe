import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addClient = {
  nombreCliente: string;
  cedulaCliente: number;
  telefonoCliente: string;
  direccionCliente: string;
};

async function AddClient(data: addClient) {
  const response = await axios.post(
    "https://backend-proyecto-ing-soft-ii.onrender.com/clientes/",
    data
  );

  return response.data;
}

export const UseAddClient = () => useMutation({ mutationFn: AddClient });
