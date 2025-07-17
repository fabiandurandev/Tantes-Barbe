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
import UseComprasFecha from "../../hooks/UseComprasFecha";
import { type FechaParams } from "../../hooks/UseVentasFecha";
import {
  type FechasFormType,
  fechasSchema,
} from "../../schemas/SeleccionarFechaSchema";
import ListCompraModal from "./ListCompraModal";
import { UseComprasStore } from "./store";

type Props = {
  seleccionarFechaCompraModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function SeleccionarFechaCompraModal({ seleccionarFechaCompraModal }: Props) {
  const { setCompras } = UseComprasStore();

  const listCompraModal = useDisclosure();

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
    seleccionarFechaCompraModal.onClose();
    resetForm();
  };

  const [fechaParams, setFechaParams] = useState<FechaParams>({
    fechaInicio: "",
    fechaFinal: "",
  });

  const { refetch, data: dataCompra } = UseComprasFecha(fechaParams);

  useEffect(() => {
    if (dataCompra) {
      setCompras(dataCompra);
      console.log(dataCompra);
      seleccionarFechaCompraModal.onClose();
      listCompraModal.onOpen();
      resetForm();
    }
  }, [dataCompra]);

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
      <Modal isOpen={seleccionarFechaCompraModal.isOpen} onClose={cancelar}>
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
              <>Seleccione un rango de fecha para el reporte de las compras.</>
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
      <ListCompraModal ListCompraModal={listCompraModal} />
    </>
  );
}

export default SeleccionarFechaCompraModal;
