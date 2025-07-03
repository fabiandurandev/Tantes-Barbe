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

function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Agregar Producto</Button>

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
            Agregar nuevos productos
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={4}>
            <Stack spacing={4}>
              <Heading as="h3" size="md" fontWeight="semibold">Datos del Producto</Heading>
              
              <FormControl>
                <FormLabel>Código:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Descripción:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Precio:</FormLabel>
                <Input 
                  type="number" 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Cantidad:</FormLabel>
                <Input 
                  type="number" 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>
            </Stack>
          </ModalBody>

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

export default AddProduct;