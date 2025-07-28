import axios from "axios";
import type { ProductType, ServiceType } from "../types";
import { useQuery } from "@tanstack/react-query";

const queryProductsList = (): Promise<ProductType[]> => {
  const url = "https://backend-proyecto-ing-soft-ii.onrender.com/productos";
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
