import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type addSupplier = {
  rifProveedor: number;
  nombreProveedor: string;
  emailProveedor: string;
  telefonoProveedor: string;
  direccionProveedor: string;
};

async function AddSupplierFN(supplier: addSupplier) {
  const response = await axios.post(
    "http://127.0.0.1:8000/proveedores/",
    supplier
  );

  return response.data;
}

export const UseAddSupplier = () => {
  const toast = useToast();

  return useMutation({
    mutationFn: AddSupplierFN,
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const errors = error.response?.data;

        if (errors.rifProveedor) {
          toast({
            title: "Error en el RIF",
            description: "El rif ya existe, verifique el rif",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }

        if (errors.emailProveedor) {
          toast({
            title: "Error en el correo",
            description: "El correo ya existe, verifique el correo.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top",
          });
        }
      }
    },
  });
};
