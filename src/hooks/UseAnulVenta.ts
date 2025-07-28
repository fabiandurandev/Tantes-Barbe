import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function AnularVenta(id: number) {
  const data = { estadoVenta: "ANUL" };
  const response = await axios.patch(
    `https://backend-proyecto-ing-soft-ii.onrender.com/venta/${id}`,
    data
  );
  return response.data;
}

export function UseAnulVenta() {
  return useMutation({ mutationFn: AnularVenta });
}
