import axios from "axios";
import type { CompraType, SupplierType, ProductType } from "../types";
import { useMutation } from "@tanstack/react-query";

export default function PayloadCompra(
  supplier: SupplierType | undefined,
  products?: ProductType[],
  quantityProducts?: number[]
) {
  return {
    idProveedor: supplier!.id,
    estadoCompra: "VAL",
    itemsProductosCompra: products?.map((p, i) => ({
      producto: p.id,
      cantidad: quantityProducts?.[i],
    })),
  };
}

async function CreateCompra(data: CompraType) {
  const response = await axios.post("http://127.0.0.1:8000/compras/", data);

  return response.data;
}

export const UseCreateCompra = () => useMutation({ mutationFn: CreateCompra });
