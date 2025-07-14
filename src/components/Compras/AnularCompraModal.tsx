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
import { useNavigate } from "react-router";
import { UseAnulCompra } from "../../hooks/UseAnulCompra";

type Props = {
  anularCompraModal: {
    isOpen: boolean;
    onClose: () => void;
  };
  listCompraModal: {
    isOpen: boolean;
    onClose: () => void;
  };
  idCompra: number;
};

function CancelCompraModal({
  anularCompraModal,
  idCompra,
  listCompraModal,
}: Props) {
  const navigate = useNavigate();

  const { mutate: AnularCompra } = UseAnulCompra();

  const onClick = () => {
    AnularCompra(idCompra, {
      onSuccess: () => {
        anularCompraModal.onClose();
        listCompraModal.onClose();
        navigate("/");
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={anularCompraModal.isOpen}
        onClose={anularCompraModal.onClose}
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
            <Text>¿Desea ANULAR la compra #{idCompra}?</Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="blue" mr={3} onClick={() => onClick()}>
              Aceptar
            </Button>
            <Button onClick={anularCompraModal.onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CancelCompraModal;
