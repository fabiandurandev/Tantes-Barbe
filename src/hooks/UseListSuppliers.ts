import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { SupplierType } from "../types";

const querySupplierList = (): Promise<SupplierType[]> => {
  const url = "https://backend-proyecto-ing-soft-ii.onrender.com/proveedores";
  return axios.get(url).then((response) => response.data);
};

function UseListSuppliers() {
  return useQuery({
    queryKey: ["suppliersList"],
    queryFn: () => querySupplierList(),
    enabled: false,
  });
}

export default UseListSuppliers;
