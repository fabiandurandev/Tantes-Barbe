import axios from "axios";
import type { SaleType } from "../types";
import { useMutation } from "@tanstack/react-query";

async function CreateSale(data: SaleType) {
  const response = await axios.post(
    "https://backend-proyecto-ing-soft-ii.onrender.com/ventas/",
    data
  );

  return response.data;
}

export const UseCreateSale = () => useMutation({ mutationFn: CreateSale });
