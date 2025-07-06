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
import useProductsStore from "../../contexts/store";
import ButtonDelete from "../ButtonDelete/ButtonDelete";

type Props = {
  listProductModal: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onToggle: () => void;
    isControlled: boolean;
  };
};

function ListProductModal({ listProductModal }: Props) {
  const { products, resetSale } = useProductsStore();

  const queryClient = useQueryClient();

  const onClose = () => {
    resetSale();
    queryClient.removeQueries({ queryKey: ["productsList"] });
    listProductModal.onClose();
  };

  return (
    <>
      <Modal isOpen={listProductModal.isOpen} onClose={onClose}>
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
            Productos
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
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Stock
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products !== undefined &&
                    products.map((p) => (
                      <Tr key={p.codigoProducto}>
                        <Td>{p.codigoProducto}</Td>
                        <Td>{p.nombreProducto}</Td>
                        <Td>{p.precioProducto}</Td>
                        <Td>{p.stock}</Td>
                        <Td>
                          <ButtonDelete
                            reset={resetSale}
                            name="producto"
                            codigoServicio={p.codigoProducto}
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

export default ListProductModal;
