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
        "https://backend-proyecto-ing-soft-ii.onrender.com/api/token/",
        data
      );
      console.log("Login response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.access); // guarda el token en Zustand
      toast({
        title: "Inicio de sesion",
        description: "Inicio exitoso!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("rol", data.rol); // ya tienes el rol aquí
      console.log("Rol guardado en localStorage:", localStorage.getItem("rol"));
    },
    onError: () => {
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
