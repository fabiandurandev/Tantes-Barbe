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
  HStack,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { addEmployeeSchema, type addEmployeeformType } from "../../schemas/AddEmployee";
import { zodResolver } from "@hookform/resolvers/zod";

type props = {
  addEmployeeModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function AddEmployee({ addEmployeeModal }: props) {
  const {register} = useForm<addEmployeeformType>({resolver: zodResolver(addEmployeeSchema)})
  
  return (
    <>
      <Modal
        isOpen={addEmployeeModal.isOpen}
        onClose={addEmployeeModal.onClose}
      >
        <ModalOverlay />
        <ModalContent borderRadius="20px">
          <ModalHeader
            borderTopRadius="20px"
            bg="blue.600"
            color="white"
            fontSize="lg"
            fontWeight="bold"
          >
            Agregar empleado
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
                {...register("cedulaEmpleado")}
                  type="number"
                  placeholder=""
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Teléfono:</FormLabel>
                <Input
                {...register("telefonoEmpleado")}
                  type="number"
                  placeholder=""
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Nombre:</FormLabel>
                <Input 
                {...register("nombreEmpleado")}
                placeholder="" 
                borderWidth={2}
                borderRadius="md" />
              </FormControl>

              <FormControl>
                <FormLabel>Email:</FormLabel>
                <Input
                {...register("emailEmpleado")}
                  type="email"
                  placeholder=""
                  borderWidth={2}
                  borderRadius="md"
                />
              </FormControl>

              {/* Nivel de autorizacion */}

              <FormLabel>Nivel de autorizacion</FormLabel>

              <Select placeholder=" Seleccione una opcion ">
                <option value="ADM"> Administrador </option>

                <option value="EMP"> Empleado </option>
              </Select>

              <FormControl>
                <FormLabel>Dirección:</FormLabel>
                <Input 
                {...register("direccionEmpleado")}
                placeholder="" 
                borderWidth={2} 
                borderRadius="md" />
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
              onClick={addEmployeeModal.onClose}
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
