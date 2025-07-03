import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SupplierType } from "../types";

const querySupplier = async (rif: number): Promise<SupplierType> => {
  const url = `http://127.0.0.1:8000/proveedor/${rif}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }
};

export function UseRetrieveSupplier(params: number) {
  return useQuery({
    queryKey: ["supplier", params],
    queryFn: () => querySupplier(params),
    enabled: false,
  });
}
