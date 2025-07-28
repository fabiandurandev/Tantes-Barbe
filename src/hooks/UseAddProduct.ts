import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addProductData = {
  nombreProducto: string;
  codigoProducto: number;
  stock: number;
  precioProducto: number;
};

async function AddProduct(data: addProductData) {
  const response = await axios.post(
    "https://backend-proyecto-ing-soft-ii.onrender.com/productos/",
    data
  );

  return response.data;
}

export const UseAddProduct = () => useMutation({ mutationFn: AddProduct });
