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
import { UseSupplierListStore } from "../../contexts/store";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

type Props = {
  modalListSupplier: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function ListSupplierModal({ modalListSupplier }: Props) {
  const { suppliers, resetSupplierList } = UseSupplierListStore();

  const queryClient = useQueryClient();

  const onClose = () => {
    resetSupplierList();
    queryClient.removeQueries({ queryKey: ["suppliersList"] });
    modalListSupplier.onClose();
  };

  return (
    <>
      <Modal isOpen={modalListSupplier.isOpen} onClose={onClose}>
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
                      Rif
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
                  </Tr>
                </Thead>
                <Tbody>
                  {suppliers !== undefined &&
                    suppliers.map((s) => (
                      <Tr key={s.rifProveedor}>
                        <Td>{s.rifProveedor}</Td>
                        <Td>{s.nombreProveedor}</Td>
                        <Td>{s.emailProveedor}</Td>
                        <Td>{s.telefonoProveedor}</Td>
                        <Td>{s.direccionProveedor}</Td>
                        <Td>
                          <ButtonDelete
                            name="proveedor"
                            reset={resetSupplierList}
                            codigoServicio={s.rifProveedor}
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

export default ListSupplierModal;
