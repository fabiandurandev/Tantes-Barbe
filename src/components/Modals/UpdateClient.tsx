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
  Heading,
  Divider,
} from "@chakra-ui/react";

function UpdateClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Modificar Cliente</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"20px"}>
          <ModalHeader 
            borderTopRadius={"20px"} 
            bg={"blue.600"} 
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Modificar Cliente
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={4}>
            <Stack spacing={4}>
              <Heading as="h3" size="md" fontWeight="semibold">Datos del Cliente</Heading>
              
              <FormControl>
                <FormLabel>Cédula</FormLabel>
                <Input
                  type="number"
                  placeholder="V-########"
                  borderWidth={2}
                  fontWeight="bold"
                  borderRadius="md"

                />
              </FormControl>

              <FormControl>
                <FormLabel>Teléfono:</FormLabel>
                <Input 
                  type="number"
                  placeholder="###########" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Nombre:</FormLabel>
                <Input 
                  placeholder="####"
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dirección:</FormLabel>
                <Input 
                  placeholder="####"
                  borderWidth={2}
                  borderRadius="md"
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

export default UpdateClient;