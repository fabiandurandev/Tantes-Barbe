// hooks/useSolicitarCodigo.ts
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router";
import useEmailStore from "../VerificarCodigo/store";
import { set } from "react-hook-form";

type SolicitarCodigoData = {
  email: string;
};

const useSolicitarCodigo = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { setEmail } = useEmailStore();

  return useMutation({
    mutationFn: async (data: SolicitarCodigoData) => {
      setEmail(data.email);
      const response = await axios.post(
        "http://localhost:8000/solicitar-codigo/",
        data
      );
      return response.data;
    },
    onSuccess: (data: SolicitarCodigoData) => {
      toast({
        title: "Código enviado",
        description: "Revisa tu correo electrónico.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("verificacion_iniciada", "true");

      navigate("/verificar-codigo/");

      // Opcional: puedes navegar al paso de verificación
    },
    onError: () => {
      toast({
        title: "Error al enviar el código",
        description: "No se pudo enviar el código. Verifique el correo.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useSolicitarCodigo;
