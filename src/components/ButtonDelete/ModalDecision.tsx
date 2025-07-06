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

type PropsModal = {
  ModalDecision: {
    isOpen: boolean;
    onClose: () => void;
  };
  onClick: () => void;
};

function ModalDecision({ ModalDecision, onClick }: PropsModal) {
  return (
    <>
      <Modal isOpen={ModalDecision.isOpen} onClose={ModalDecision.onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"10"}>
          <ModalHeader borderTopRadius={"10"} bg={"blue.600"}>
            Aviso
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>¿Desea eliminar este servicio?</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClick} colorScheme="blue" mr={3}>
              Aceptar
            </Button>
            <Button onClick={ModalDecision.onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalDecision;
