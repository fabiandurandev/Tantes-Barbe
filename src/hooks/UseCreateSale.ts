import axios from "axios";
import type { SaleType } from "../types";
import { useMutation } from "@tanstack/react-query";

async function CreateSale(data: SaleType) {
  const response = await axios.post("http://127.0.0.1:8000/ventas/", data);

  return response.data;
}

export const UseCreateSale = () => useMutation({ mutationFn: CreateSale });
