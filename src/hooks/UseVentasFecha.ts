import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { VentaType } from "../types";

export type FechaParams = {
  fechaInicio: string;
  fechaFinal: string;
};

const queryVentaFecha = async ({
  fechaInicio,
  fechaFinal,
}: FechaParams): Promise<VentaType[]> => {
  const url = "http://127.0.0.1:8000/ventas/por-fechas/";

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

function UseVentasFecha(params: FechaParams) {
  return useQuery({
    queryKey: ["ventasFecha", params.fechaInicio, params.fechaFinal],
    queryFn: () => queryVentaFecha(params),
    enabled: false,
  });
}

export default UseVentasFecha;
