import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function AnularVenta(id: number) {
  const data = { estadoVenta: "ANUL" };
  const response = await axios.patch(`http://127.0.0.1:8000/venta/${id}`, data);
  return response.data;
}

export function UseAnulVenta() {
  return useMutation({ mutationFn: AnularVenta });
}
