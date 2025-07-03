import axios from "axios";
import type { ProductType, ServiceType } from "../types";
import { useQuery } from "@tanstack/react-query";

const queryProductsList = (): Promise<ProductType[]> => {
  const url = "http://127.0.0.1:8000/productos";
  return axios.get(url).then((response) => response.data);
};

function UseListProducts() {
  return useQuery({
    queryKey: ["productsList"],
    queryFn: () => queryProductsList(),
    enabled: false,
  });
}

export default UseListProducts;
