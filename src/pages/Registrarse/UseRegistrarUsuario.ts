// hooks/useRegister.ts
import axios from "axios";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

type RegisterData = {
  email: string;
  password: string;
};

const UseRegistrarUsuario = () => {
  const navigate = useNavigate();

  const toast = useToast();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await axios.post(
        "https://backend-proyecto-ing-soft-ii.onrender.com/registro_usuario/",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Usuario creado",
        description: "Usuario creado con éxito!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      navigate("/login");
    },
    onError: () => {
      toast({
        title: "Registro fallido.",
        description: "Correo ya registrado, verifique el correo",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default UseRegistrarUsuario;
