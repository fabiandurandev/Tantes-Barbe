// hooks/useCambiarContrasena.ts
import { useNavigate } from "react-router";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type CambiarContrasenaData = {
  nueva_contrasena: string;
};

const useCambiarContrasena = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CambiarContrasenaData) => {
      const token = localStorage.getItem("token_temporal");

      if (!token) {
        throw new Error("Token no disponible");
      }

      const response = await axios.post(
        "https://backend-proyecto-ing-soft-ii.onrender.com/cambiar-contrasena/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Contraseña cambiada",
        description: "Ya puedes iniciar sesión.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      localStorage.removeItem("token_temporal");
      localStorage.removeItem("verificacion_iniciada");

      navigate("/login");
    },
    onError: () => {
      toast({
        title: "Error al cambiar contraseña",
        description: "Verifica el token o intenta de nuevo.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useCambiarContrasena;
