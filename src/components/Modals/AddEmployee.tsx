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
  Radio,
  RadioGroup,
  HStack
} from "@chakra-ui/react";
import React from "react";

function AddEmployee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authorizationLevel, setAuthorizationLevel] = React.useState("1");

  return (
    <>
      <Button onClick={onOpen}>Agregar Empleado</Button>

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
            Agregar nuevos empleados
          </ModalHeader>
          <ModalCloseButton color="white" />
          
          <ModalBody py={4}>
            <Stack spacing={4}>
              <Heading as="h3" size="md" fontWeight="semibold">Datos del Empleado</Heading>
              
              <FormControl>
                <FormLabel>Cédula:</FormLabel>
                <Input 
                  type="number"
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Teléfono:</FormLabel>
                <Input 
                  type="number"
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
                <FormLabel>Email:</FormLabel>
                <Input 
                  type="email"
                  placeholder="" 
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              {/* Nivel de autorizacion */}

              <FormControl>
                <FormLabel>Nivel de Autorización:</FormLabel>
                <RadioGroup 
                  value={authorizationLevel} 
                  onChange={setAuthorizationLevel}
                >
                  <HStack spacing={5}>
                    <Radio value="1">1</Radio>
                    <Radio value="2">2</Radio>
                  </HStack>
                </RadioGroup>
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

export default AddEmployee;