// hooks/useLogin.ts
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../contexts/authStore";
import { useToast } from "@chakra-ui/react";

type LoginData = {
  email: string;
  password: string;
};

const useLogin = () => {
  const login = useAuthStore((state) => state.login);

  const toast = useToast();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      login(data.access); // guarda el token en Zustand
      toast({
        title: "Inicio de sesion",
        description: "Inicion exitoso!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
    onError: (error) => {
      toast({
        title: "Login fallido",
        description: "Verifica tu correo y contraseña",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    },
  });
};

export default useLogin;
