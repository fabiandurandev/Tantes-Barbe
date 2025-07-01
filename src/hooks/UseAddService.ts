import axios from "axios";
import type { addServiceFormType } from "../schemas/AddService";
import { useMutation } from "@tanstack/react-query";

type addService = {
  nombreServicio: string;
  codigoServicio: number;
  precioServicio: number;
};

async function AddService(data: addService) {
  const response = await axios.post("http://127.0.0.1:8000/servicios/", data);

  return response.data;
}

export const UseAddService = () => useMutation({ mutationFn: AddService });
