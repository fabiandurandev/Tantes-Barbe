// hooks/useVerificarCodigo.ts
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";

type VerificarCodigoData = {
  email: string;
  codigo: string;
};

const useVerificarCodigo = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: VerificarCodigoData) => {
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/verificar-codigo/",
        data
      );
      return response.data; // esto debería incluir el token temporal
    },
    onSuccess: (data) => {
      // Guarda el token temporal en localStorage para usarlo al cambiar la contraseña
      localStorage.setItem("token_temporal", data.token_temporal);

      toast({
        title: "Código verificado",
        description: "Puedes establecer una nueva contraseña.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      navigate("/cambiar-contrasena");
    },
    onError: () => {
      toast({
        title: "Error al verificar",
        description: "Código inválido o expirado.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useVerificarCodigo;
