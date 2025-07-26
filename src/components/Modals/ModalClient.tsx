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
  useDisclosure,
} from "@chakra-ui/react";
import AddClient from "./AddClient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function ModalClient({ isOpen, onClose }: Props) {
  const addClient = useDisclosure();

  const aceptar = () => {
    onClose();
    addClient.onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"10"}>
          <ModalHeader borderTopRadius={"10"} color={"white"} bg={"blue.600"}>
            Aviso!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>El cliente no ha sido encontrado. ¿Desea registrarlo?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={aceptar}>
              Aceptar
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AddClient addClientModal={addClient} />
    </>
  );
}

export default ModalClient;
