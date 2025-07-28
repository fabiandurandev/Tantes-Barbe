import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addService = {
  nombreServicio: string;
  codigoServicio: number;
  precioServicio: number;
};

async function AddService(data: addService) {
  const response = await axios.post(
    "https://backend-proyecto-ing-soft-ii.onrender.com/servicios/",
    data
  );

  return response.data;
}

export const UseAddService = () => useMutation({ mutationFn: AddService });
