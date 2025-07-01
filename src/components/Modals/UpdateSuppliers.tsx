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
  Divider,
} from "@chakra-ui/react";

function UpdateSupplier() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Modificar Proveedor</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Modificar Proveedor
          </ModalHeader>
          <ModalCloseButton color="white" />

          <ModalBody py={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel fontWeight="bold">RIF:</FormLabel>
                <Input placeholder="###" borderWidth={2} borderRadius="md" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Email:</FormLabel>
                <Input placeholder="###" borderWidth={2} borderRadius="md" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Dirección:</FormLabel>
                <Input placeholder="###" borderWidth={2} borderRadius="md" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Nombre:</FormLabel>
                <Input placeholder="###" borderWidth={2} borderRadius="md" />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                <Input
                  placeholder="##########"
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Fecha:</FormLabel>
                <Input
                  placeholder=" /  / "
                  borderWidth={2}
                  borderRadius="md"
                  maxWidth="150px"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <Divider />

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              borderRadius="md"
              fontWeight="bold"
            >
              CONFIRMAR CAMBIOS
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              mr={3}
              borderRadius="md"
              fontWeight="bold"
            >
              ELIMINAR
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              borderRadius="md"
              fontWeight="bold"
            >
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateSupplier;
