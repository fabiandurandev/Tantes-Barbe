import {
  Button,
  FormControl,
  FormErrorMessage,
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
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { tasaCambioSchemaType } from "./TasaCambioSchema";
import tasaCambioSchema from "./TasaCambioSchema";
import { usePostTasaCambio, useTasaCambio } from "./UseTasaCambio";

type Props = {
  tasaCambio: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function TasaCambio({ tasaCambio }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<tasaCambioSchemaType>({
    resolver: zodResolver(tasaCambioSchema),
  });

  const [editando, setEditando] = useState(false);

  const cancelar = () => {
    setEditando(false);
    tasaCambio.onClose();
  };

  const { data } = useTasaCambio();

  const { mutate: guardarTasaCambio, isPending } = usePostTasaCambio();

  useEffect(() => {
    if (data) {
      setValue("tasaCambio", data.valor);
    }
  }, [data]);

  const onSubmit = (data: tasaCambioSchemaType) => {
    guardarTasaCambio(
      { valor: data.tasaCambio },
      {
        onSuccess: () => {
          setEditando(false);
        },
      }
    );
  };

  return (
    <>
      <Modal isOpen={tasaCambio.isOpen} onClose={cancelar}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader bg={"blue.600"} color="white" borderTopRadius={"20px"}>
            Tasa de cambio
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={!!errors.tasaCambio}>
                <FormLabel>Tasa</FormLabel>
                <Input isDisabled={!editando} {...register("tasaCambio")} />
                {isPending && <Spinner />}

                <FormErrorMessage>
                  {errors.tasaCambio && errors.tasaCambio.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => setEditando(true)}
                colorScheme="blue"
                mr={3}
              >
                Actualizar
              </Button>
              <Button colorScheme="blue" mr={3} type="submit">
                Guardar
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

export default TasaCambio;
