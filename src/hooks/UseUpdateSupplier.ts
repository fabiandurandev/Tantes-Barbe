import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type dataSupplier = {
  emailProveedor: string;
  direccionProveedor: string;
  nombreProveedor: string;
  telefonoProveedor: string;
};

async function UpdateSupplier({
  rifProveedor,
  data,
}: {
  rifProveedor: number;
  data: dataSupplier;
}) {
  const response = await axios.patch(
    `https://backend-proyecto-ing-soft-ii.onrender.com/proveedor/${rifProveedor}`,
    data
  );
  return response.data;
}

export function UseUpdateSupplier() {
  const toast = useToast();
  return useMutation({
    mutationFn: UpdateSupplier,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response.data;

        if (errors.emailProveedor) {
          toast({
            title: "Error en el correo.",
            description: "El correo ingreado ya existe, verifique el correo.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      }
    },
  });
}
