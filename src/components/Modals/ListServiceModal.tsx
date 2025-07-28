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
import { UseServicesStore } from "../../contexts/store";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

type Props = {
  modal4: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function ListServiceModal({ modal4 }: Props) {
  const { services, resetSale } = UseServicesStore();

  const queryClient = useQueryClient();

  const onClose = () => {
    resetSale();
    queryClient.removeQueries({ queryKey: ["servicesList"] });
    modal4.onClose();
  };

  return (
    <>
      <Modal isOpen={modal4.isOpen} onClose={onClose}>
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
                      Codigo
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Nombre
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Precio
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {services !== undefined &&
                    services.map((s) => (
                      <Tr key={s.codigoServicio}>
                        <Td>{s.codigoServicio}</Td>
                        <Td>{s.nombreServicio}</Td>
                        <Td>{s.precioServicio}</Td>
                        <Td>
                          <ButtonDelete
                            modalList={modal4}
                            reset={resetSale}
                            name="servicio"
                            codigoServicio={s.codigoServicio}
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

export default ListServiceModal;
