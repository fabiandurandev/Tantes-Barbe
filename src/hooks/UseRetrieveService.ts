import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ServiceType } from "../types";

const queryService = async (codigo: number): Promise<ServiceType> => {
  const url = `http://127.0.0.1:8000/servicio/${codigo}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }
};

function UseRetrieveSearch(params: number) {
  return useQuery({
    queryKey: ["service", params],
    queryFn: () => queryService(params),
    enabled: false,
  });
}

export default UseRetrieveSearch;
