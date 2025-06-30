import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function Services() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20"}>
          <ModalHeader borderTopRadius={"10"} bg={"blue.600"}>
            Agregar nuevos servicios
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              /* Código */
              <FormControl>
                <FormLabel>Código:</FormLabel>
                <Input placeholder="Ingrese el codigo" borderWidth={2} />
              </FormControl>
              /* descripcion */
              <FormControl>
                <FormLabel>Descripción:</FormLabel>
                <Input placeholder="Ingrese la descripcion" borderWidth={2} />
              </FormControl>
              /* Precio */
              <FormControl>
                <FormLabel>Precio:</FormLabel>
                <Input
                  type="number"
                  placeholder="Ingrese el precio"
                  borderWidth={2}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              CANCELAR
            </Button>
            <Button colorScheme="blue"> + Agregar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Services;
