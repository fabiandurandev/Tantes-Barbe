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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
function ModalClient({ isOpen, onClose }: Props) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"10"}>
          <ModalHeader borderTopRadius={"10"} bg={"blue.600"}>
            Aviso
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sit
              quod tempora. Deserunt nemo porro, consequatur perferendis odio
              blanditiis hic corporis, laboriosam id rem tempora harum,
              similique nostrum unde. Nobis.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalClient;
