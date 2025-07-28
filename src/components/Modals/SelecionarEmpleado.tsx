import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useProductsStore, {
  useClientStore,
  UseEmployeesListStore,
  UseServicesStore,
} from "../../contexts/store";
import { UseCreateSale } from "../../hooks/UseCreateSale";
import UseListEmployees from "../../hooks/UseListEmployees";
import {
  seleccionarempleadoSchema,
  type seleccionarempleadoSchemaType,
} from "../../schemas/SeleccionarEmpleado";
import PayloadVenta from "../ProductSelector/PayloadVenta";

type Props = {
  selecionarProductoModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function SelecionarEmpleado({ selecionarProductoModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<seleccionarempleadoSchemaType>({
    resolver: zodResolver(seleccionarempleadoSchema),
  });

  const [codigo, setCodigo] = useState<number>(0);

  const { products, quantity, resetSale } = useProductsStore();

  const {
    services,
    quantity: quantityService,
    resetSale: resetSaleService,
  } = UseServicesStore();

  const { mutate: RegisterSale } = UseCreateSale();

  const { client, resetClient } = useClientStore();

  const queryClient = useQueryClient();

  const { data: empleados } = UseListEmployees();

  const { setEmployeesList, employees } = UseEmployeesListStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (empleados) {
      setEmployeesList(empleados);
    }
  }, [empleados]);

  const cancelar = () => {
    selecionarProductoModal.onClose();
    reset();
  };

  const onSubmit = () => {
    const payload = PayloadVenta(
      client,
      codigo,
      products,
      services,
      quantity,
      quantityService
    );
    RegisterSale(payload, {
      onSuccess: () => {
        reset();
        resetClient();
        resetSale();
        resetSaleService();
        selecionarProductoModal.onClose();
        queryClient.resetQueries({ queryKey: ["client"] });
        queryClient.resetQueries({ queryKey: ["services"] });
        queryClient.setQueryData(["services"], undefined);
        queryClient.resetQueries({ queryKey: ["products"] });
        queryClient.setQueryData(["products"], undefined);

        navigate("/");
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={selecionarProductoModal.isOpen}
        onClose={selecionarProductoModal.onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Seleccione un empleado
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={!!errors.empleado}>
                <FormLabel>Empleado:</FormLabel>
                <Select
                  {...register("empleado", {
                    setValueAs: (value) => Number(value),
                  })}
                  placeholder="Seleccione un empleado."
                >
                  {employees?.map((empleado) => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.nombreEmpleado}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.empleado && errors.empleado.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setCodigo(getValues("empleado"))}
                type="submit"
              >
                Aceptar
              </Button>
              <Button variant="ghost" onClick={cancelar}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SelecionarEmpleado;
