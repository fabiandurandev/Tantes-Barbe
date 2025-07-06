import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addProductData = {
  nombreProducto: string;
  codigoProducto: number;
  stock: number;
  precioProducto: number;
};

async function AddProduct(data: addProductData) {
  const response = await axios.post("http://127.0.0.1:8000/productos/", data);

  return response.data;
}

export const UseAddProduct = () => useMutation({ mutationFn: AddProduct });
