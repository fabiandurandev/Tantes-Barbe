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
  Divider
} from "@chakra-ui/react";

function AddSupplier() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Agregar Proveedor</Button>

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
            Agregar nuevos proveedores
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={4}>
            <Stack spacing={4}>
              <Heading as="h3" size="md" fontWeight="semibold">Datos del Proveedor</Heading>

              { /* RIF de la empresa */}
              
              <FormControl>
                <FormLabel fontWeight="bold">RIF:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              { /* parte para el nombre */}

              <FormControl>
                <FormLabel fontWeight="bold">Nombre:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              { /* Correo electronico */}

              <FormControl>
                <FormLabel fontWeight="bold">Email:</FormLabel>
                <Input 
                  type="email"
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              { /* Seccion del numero del telefono */}

              <FormControl>
                <FormLabel fontWeight="bold">Teléfono:</FormLabel>
                <Input 
                  type="tel"
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              { /* Seccion de la direccion */}

              <FormControl>
                <FormLabel fontWeight="bold">Dirección:</FormLabel>
                <Input 
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              { /* Seccion para la fecha */}

              <FormControl>
                <FormLabel fontWeight="bold">Fecha:</FormLabel>
                <Input 
                  placeholder="  /  /  " 
                  borderWidth={2}
                  borderRadius="md"
                  maxWidth="150px"
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <Divider />

          { /* Seccion de botones */}

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

export default AddSupplier;