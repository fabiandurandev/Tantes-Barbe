import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ProductType } from "../types";

const queryProduct = async (codigoProduct: number): Promise<ProductType> => {
  const url = `http://127.0.0.1:8000/producto/${codigoProduct}`;

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
    queryFn: () => queryProduct(params),
    enabled: false,
  });
}

export default UseRetrieveProduct;
