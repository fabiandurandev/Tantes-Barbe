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
import { useNavigate } from "react-router";
import useProductsStore, {
  useClientStore,
  UseServicesStore,
} from "../../contexts/store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function CancelSaleModal({ isOpen, onClose }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { resetSale } = useProductsStore();

  const { resetSale: resetSaleServices } = UseServicesStore();

  const { resetClient } = useClientStore();

  const onClick = () => {
    resetClient();
    resetSale();
    resetSaleServices();
    onClose();
    queryClient.removeQueries({ queryKey: ["client"] });
    navigate("/");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Text>¿Desea CANCELAR la venta?</Text>
          </ModalBody>

          <ModalFooter justifyContent={"center"}>
            <Button colorScheme="blue" mr={3} onClick={() => onClick()}>
              Aceptar
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CancelSaleModal;
