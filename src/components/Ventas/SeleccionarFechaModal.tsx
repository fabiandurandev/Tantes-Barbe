import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UseVentasFecha, { type FechaParams } from "../../hooks/UseVentasFecha";
import {
  type FechasFormType,
  fechasSchema,
} from "../../schemas/SeleccionarFechaSchema";
import ListVentaModal from "./ListVentaModal";
import { UseVentasStore } from "./store";

type Props = {
  seleccionarFechaModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function SeleccionarFecharModal({ seleccionarFechaModal }: Props) {
  const { setVentas } = UseVentasStore();

  const listVentaModal = useDisclosure();

  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FechasFormType>({
    resolver: zodResolver(fechasSchema),
  });

  const cancelar = () => {
    seleccionarFechaModal.onClose();
    resetForm();
  };

  const [fechaParams, setFechaParams] = useState<FechaParams>({
    fechaInicio: "",
    fechaFinal: "",
  });

  const { refetch, data: dataVenta } = UseVentasFecha(fechaParams);

  useEffect(() => {
    if (dataVenta) {
      setVentas(dataVenta);
      console.log(dataVenta);
      seleccionarFechaModal.onClose();
      listVentaModal.onOpen();
      resetForm();
    }
  }, [dataVenta]);

  const onSubmit = () => {
    refetch();
  };

  const onClick = () => {
    const FechaParams = {
      fechaInicio: getValues("fechaInicio"),
      fechaFinal: getValues("fechaFin"),
    };
    setFechaParams(FechaParams);
  };
  return (
    <>
      <Modal
        isOpen={seleccionarFechaModal.isOpen}
        onClose={seleccionarFechaModal.onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Fecha
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <>Seleccione un rango de fecha para el reporte de las ventas.</>
              <Input {...register("fechaInicio")} type="date" />
              {errors && <Text color="red">{errors.fechaFin?.message}</Text>}
              <Input {...register("fechaFin")} type="date" />
              {errors && <Text color="red">{errors.fechaFin?.message}</Text>}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClick} type="submit" colorScheme="blue" mr={3}>
                Aceptar
              </Button>
              <Button onClick={cancelar} variant="ghost">
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <ListVentaModal ListVentaModal={listVentaModal} />
    </>
  );
}

export default SeleccionarFecharModal;
