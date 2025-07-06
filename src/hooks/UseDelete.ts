import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

async function deleteSome({ codigo, name }: { codigo: number; name: string }) {
  const response = await axios.delete(
    `http://127.0.0.1:8000/${name}/${codigo}`
  );
  return response.data;
}

export const UseDelete = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteSome,
    onSuccess: () => {
      // Opcional: invalidar lista para actualizar después del delete
      queryClient.removeQueries({ queryKey: ["servicesList"] });
      navigate("/");
    },
  });
};
