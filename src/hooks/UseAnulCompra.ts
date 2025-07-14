import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function AnularCompra(id: number) {
  const data = { estadoCompra: "ANUL" };
  const response = await axios.patch(
    `http://127.0.0.1:8000/compra/${id}`,
    data
  );
  return response.data;
}

export function UseAnulCompra() {
  return useMutation({ mutationFn: AnularCompra });
}
