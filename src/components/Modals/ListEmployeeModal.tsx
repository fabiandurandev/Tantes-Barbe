import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { UseEmployeesListStore } from "../../contexts/store";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

type Props = {
  modalListEmployee: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function ListEmployeeModal({ modalListEmployee }: Props) {
  const { employees, resetEmployeesList } = UseEmployeesListStore();

  const queryClient = useQueryClient();

  const onClose = () => {
    resetEmployeesList();
    queryClient.removeQueries({ queryKey: ["employeesList"] });
    modalListEmployee.onClose();
  };

  return (
    <>
      <Modal isOpen={modalListEmployee.isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius={"2xl"}
          width="80vw" // 80% del ancho de la ventana
          height="70vh" // 70% del alto de la ventana
          maxW="none"
        >
          <ModalHeader
            borderTopRadius={"2xl"}
            color={"white"}
            bgColor={"blue.600"}
            textAlign={"center"}
          >
            Servicios
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr fontWeight={"extrabold"} fontSize={"2xl"}>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Cédula
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Nombre
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Email
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Teléfono
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Dirección
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      autorización
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees !== undefined &&
                    employees.map((e) => (
                      <Tr key={e.cedulaEmpleado}>
                        <Td>{e.cedulaEmpleado}</Td>
                        <Td>{e.nombreEmpleado}</Td>
                        <Td>{e.emailEmpleado}</Td>
                        <Td>{e.telefonoEmpleado}</Td>
                        <Td>{e.direccionEmpleado}</Td>
                        <Td>{e.nivelAutorizacion}</Td>
                        <Td>
                          <ButtonDelete
                            name="empleado"
                            codigoServicio={e.cedulaEmpleado}
                            reset={resetEmployeesList}
                          />
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ListEmployeeModal;
