import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type TasaCambio = {
  id: number;
  valor: number;
  fecha: string;
};

const getUltimaTasaCambio = async (): Promise<TasaCambio> => {
  const res = await axios.get("http://127.0.0.1:8000/tasa-cambio/");
  return res.data;
};

const postTasaCambio = async (nuevaTasa: {
  valor: number;
}): Promise<TasaCambio> => {
  const res = await axios.post("http://127.0.0.1:8000/tasa-cambio/", nuevaTasa);
  return res.data;
};

export const useTasaCambio = () => {
  return useQuery({
    queryKey: ["ultima-tasa"],
    queryFn: getUltimaTasaCambio,
  });
};

export const usePostTasaCambio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTasaCambio,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ultima-tasa"] });
    },
  });
};
