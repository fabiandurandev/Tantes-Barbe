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
  Text
} from "@chakra-ui/react";

function UpdateService() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Modificar Servicio</Button>

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
            Modificar Servicio
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={4}>
            <Stack spacing={6}>
              <Text fontSize="md" fontWeight="semibold">Modificar Servicio</Text>
              
              <FormControl>
                <FormLabel>Código:</FormLabel>
                <Input 
                  placeholder="#####" 
                  borderWidth={2} 
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="bold"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descripción:</FormLabel>
                <Input 
                  placeholder=" " 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Precio:</FormLabel>
                <Input 
                  type="number" 
                  placeholder="#####" 
                  borderWidth={2}
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="bold"
                />
              </FormControl>
            </Stack>
          </ModalBody>

         { /* Parte de los botones */ }

          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3}
              borderRadius="md"
            >
              CONFIRMAR CAMBIOS
            </Button>
            <Button 
              colorScheme="red" 
              variant="outline"
              mr={3}
              borderRadius="md"
            >
              ELIMINAR
            </Button>
            <Button 
              variant="ghost" 
              onClick={onClose}
              borderRadius="md"
            >
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateService;