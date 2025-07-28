import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function UpdateService({
  codigoServicio,
  data,
}: {
  codigoServicio: number;
  data: { nombreServicio: string; precioServicio: number };
}) {
  const response = await axios.patch(
    `https://backend-proyecto-ing-soft-ii.onrender.com/servicio/${codigoServicio}`,
    data
  );
  return response.data;
}

export function UseUpdateService() {
  return useMutation({ mutationFn: UpdateService });
}
