import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ComprasType } from "../types";

export type FechaParams = {
  fechaInicio: string;
  fechaFinal: string;
};

const queryCompraFecha = async ({
  fechaInicio,
  fechaFinal,
}: FechaParams): Promise<ComprasType[]> => {
  const url =
    "https://backend-proyecto-ing-soft-ii.onrender.com/compras/por-fechas/";

  try {
    const response = await axios.get(url, {
      params: {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }
};

function UseComprasFecha(params: FechaParams) {
  return useQuery({
    queryKey: ["comprasFecha", params.fechaInicio, params.fechaFinal],
    queryFn: () => queryCompraFecha(params),
    enabled: false,
  });
}

export default UseComprasFecha;
