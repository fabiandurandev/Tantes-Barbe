import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEmployeeStore } from "../../contexts/store";
import UseRetrieveEmployee from "../../hooks/UseRetrieveEmployee";
import {
  retrieveEmployeeSchema,
  type retrieveEmployeeFormType,
} from "../../schemas/RetrieveEmployee";

type Props = {
  CedulaEmployeeModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
  UpdateEmployeeModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function CedulaEmployeeModal({
  CedulaEmployeeModal,
  UpdateEmployeeModal,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<retrieveEmployeeFormType>({
    resolver: zodResolver(retrieveEmployeeSchema),
  });

  const [cedula, setCedula] = useState<number>(0);

  const {
    data: dataService,
    refetch,
    error,
    isLoading,
  } = UseRetrieveEmployee(cedula);

  const { setEmployee } = useEmployeeStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataService) {
      setEmployee(dataService);
      UpdateEmployeeModal.onOpen();
      CedulaEmployeeModal.onClose();
      reset();
    }
  }, [dataService]);

  const onSubmit = () => {
    refetch();
  };

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["employee"] });
    CedulaEmployeeModal.onClose();
    reset();
  };

  return (
    <>
      <Modal isOpen={CedulaEmployeeModal.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Cédula Empleado
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Cédula:</FormLabel>
                <Input
                  {...register("cedulaEmpleado")}
                  placeholder="Ingrese la cédula del empleado"
                />
                {isLoading && <Spinner />}

                {errors && (
                  <Text color={"red"}>{errors.cedulaEmpleado?.message}</Text>
                )}

                {error && <Text color={"red"}>Empleado no encontrado</Text>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setCedula(getValues("cedulaEmpleado"))}
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

export default CedulaEmployeeModal;
