import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SupplierType } from "../types";

const querySupplier = async (rif: number): Promise<SupplierType> => {
  const url = `https://backend-proyecto-ing-soft-ii.onrender.com/proveedor/${rif}`;

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
