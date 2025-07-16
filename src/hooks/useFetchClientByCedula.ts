import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchClientByCedula(cedulaCliente: number | undefined) {
  return useQuery({
    queryKey: ["client", cedulaCliente],
    queryFn: async () => {
      if (!cedulaCliente) throw new Error("No cedula");
      const res = await axios.get(
        `http://localhost:8000/cliente/${cedulaCliente}`
      );
      return res.data;
    },
    enabled: !!cedulaCliente, // Solo ejecuta si hay cédula
    retry: false,
  });
}
