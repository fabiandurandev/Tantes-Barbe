import { useQuery } from "@tanstack/react-query";
import type { ProductType } from "../types";
import axios from "axios";

const queryProducts = async (
  params: string | undefined
): Promise<ProductType[]> => {
  const url = "http://127.0.0.1:8000/productos";
  try {
    const response = await axios.get(url, {
      params: params ? { nombreProducto__icontains: params } : {},
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }

  //.then((response) => response.data);
};

function UseProductsSearch(params: string | undefined) {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => queryProducts(params),
    enabled: false,
  });
}

export default UseProductsSearch;
