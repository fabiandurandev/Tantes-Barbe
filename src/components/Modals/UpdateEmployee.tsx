import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {useForm } from "react-hook-form";
import { useEmployeeStore } from "../../contexts/store";




type Props = {
  modal2: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled

  };


}


function UpdateEmployee() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authorizationLevel, setAuthorizationLevel] = React.useState("1");

  return (
    <>
      <Button onClick={onOpen}>Modificar Empleado</Button>

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
            Modificar empleados
          </ModalHeader>
          <ModalCloseButton color="white" />

          <ModalBody py={4}>
            <Stack spacing={4}>
              <Heading as="h3" size="md" fontWeight="semibold">
                Datos del Empleado
              </Heading>

              <FormControl>
                <FormLabel>Cédula:</FormLabel>
                <Input
                  type="number"
                  placeholder="###"
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Teléfono:</FormLabel>
                <Input
                  type="number"
                  placeholder="###"
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Nombre:</FormLabel>
                <Input
                  placeholder="###"
                  borderWidth={2}
                  borderRadius="md"
                  fontWeight="bold"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                  placeholder="###"
                  borderWidth={2}
                  borderRadius="md"
                  fontWeight="bold"
                />
              </FormControl>

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
                <Input placeholder="###" borderWidth={2} borderRadius="md" />
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

export default UpdateEmployee;
