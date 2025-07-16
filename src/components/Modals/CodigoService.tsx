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
import { UseServiceStoreUpdateDelete } from "../../contexts/store";
import UseRetrieveSearch from "../../hooks/UseRetrieveService";
import type { retrieveServiceFormType } from "../../schemas/RetrieveService";
import retrieveService from "../../schemas/RetrieveService";

type Props = {
  modal3: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
  modal2: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function CodigoServiceModal({ modal3, modal2 }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<retrieveServiceFormType>({
    resolver: zodResolver(retrieveService),
  });

  const [codigo, setCodigo] = useState<number>(0);

  const {
    data: dataService,
    refetch,
    error,
    isLoading,
  } = UseRetrieveSearch(codigo);

  const { setService } = UseServiceStoreUpdateDelete();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (dataService) {
      setService(dataService);
      modal2.onOpen();
      modal3.onClose();
      reset();
    }
  }, [dataService]);

  const onSubmit = () => {
    refetch();
  };

  const cancelar = () => {
    queryClient.removeQueries({ queryKey: ["service"] });
    modal3.onClose();
    reset();
  };

  return (
    <>
      <Modal isOpen={modal3.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Codigo Servicio
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl>
                <FormLabel>Codigo:</FormLabel>
                <Input
                  {...register("codigoServicio")}
                  placeholder="Ingrese el codigo del producto"
                />
                {isLoading && <Spinner />}

                {errors && (
                  <Text color={"red"}>{errors.codigoServicio?.message}</Text>
                )}

                {error && <Text color={"red"}>Servicio no encontrado</Text>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setCodigo(getValues("codigoServicio"))}
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

export default CodigoServiceModal;
