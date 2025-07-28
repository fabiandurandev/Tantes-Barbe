import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductType } from "../types";

const queryRetrieveProduct = async (codigo: number): Promise<ProductType> => {
  const url = `https://backend-proyecto-ing-soft-ii.onrender.com/producto/${codigo}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }
};

function UseRetrieveProduct(params: number) {
  return useQuery({
    queryKey: ["product", params],
    queryFn: () => queryRetrieveProduct(params),
    enabled: false,
  });
}

export default UseRetrieveProduct;
