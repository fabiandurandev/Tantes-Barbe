import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { UseAnulVenta } from "../../hooks/UseAnulVenta";

type Props = {
  anularVentaModal: {
    isOpen: boolean;
    onClose: () => void;
  };
  idVenta: number;
};

function CancelSaleModal({ anularVentaModal, idVenta }: Props) {
  const queryClient = useQueryClient();

  const { mutate: AnularVenta } = UseAnulVenta();

  const onClick = () => {
    AnularVenta(idVenta, {
      onSuccess: () => {
        anularVentaModal.onClose();
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={anularVentaModal.isOpen}
        onClose={anularVentaModal.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            color={"white"}
            borderTopRadius={"md"}
            bgColor={"#2D64DF"}
          >
            Mensaje
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyItems={"center"}>
            <Text>¿Desea ANULAR la venta?</Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="blue" mr={3} onClick={() => onClick()}>
              Aceptar
            </Button>
            <Button onClick={anularVentaModal.onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CancelSaleModal;
