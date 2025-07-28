import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function AnularCompra(id: number) {
  const data = { estadoCompra: "ANUL" };
  const response = await axios.patch(
    `https://backend-proyecto-ing-soft-ii.onrender.com/compra/${id}`,
    data
  );
  return response.data;
}

export function UseAnulCompra() {
  return useMutation({ mutationFn: AnularCompra });
}
