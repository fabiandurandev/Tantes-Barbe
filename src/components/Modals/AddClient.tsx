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
  Heading
} from "@chakra-ui/react";

function AddClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Agregar Cliente</Button>

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
            Agregar nuevos clientes
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={4}>
            <Stack spacing={6}>
              <Heading as="h3" size="md" fontWeight="semibold">Datos del Cliente</Heading>
              
              <FormControl>
                <FormLabel>Cédula:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2} 
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Teléfono:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Nombre:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Dirección:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>
            </Stack>
          </ModalBody>

            {/* Parte de los botones */}

          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3}
              borderRadius="md"
              leftIcon={<span>+</span>}
            >
              Agregar
            </Button>
            <Button 
              variant="outline" 
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

export default AddClient;