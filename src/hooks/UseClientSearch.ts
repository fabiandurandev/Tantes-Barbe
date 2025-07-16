import axios from "axios";
import type { ClientType } from "../types";
import { useQuery } from "@tanstack/react-query";

const queryClient = async (cedula: number): Promise<ClientType> => {
  const url = `http://127.0.0.1:8000/cliente/${cedula}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }
};

function UseClientSearch(params: number) {
  return useQuery({
    queryKey: ["client", params],
    queryFn: () => queryClient(params),
    enabled: false,
  });
}

export default UseClientSearch;
