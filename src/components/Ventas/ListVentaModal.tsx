import {
  Box,
  Button,
  Flex,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { IoEye } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import type { VentaType } from "../../types";
import { UseDetalleVenta, UseVentasStore } from "./store";
import DetalleVentaModal from "./VentaDetalleModal";

type Props = {
  ListVentaModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function ListVentaModal({ ListVentaModal }: Props) {
  const { ventas, resetVentas } = UseVentasStore();

  const { setVenta } = UseDetalleVenta();

  const queryClient = useQueryClient();

  const onClose = () => {
    queryClient.removeQueries({ queryKey: ["ventasFecha"] });
    resetVentas();
    ListVentaModal.onClose();
  };

  const detalleVentaModal = useDisclosure();

  const verDetalleVenta = (venta: VentaType) => {
    setVenta(venta);
    detalleVentaModal.onOpen();
  };

  return (
    <>
      <Modal isOpen={ListVentaModal.isOpen} onClose={onClose}>
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
          <ModalBody overflow={"auto"}>
            <TableContainer>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr fontWeight={"extrabold"} fontSize={"2xl"}>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Venta
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Cliente
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Cédula Cliente
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Total
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Estado
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ventas !== undefined &&
                    ventas.map((v) => (
                      <Tr key={v.id}>
                        <Td>{v.id}</Td>
                        <Td>{v.idCliente.nombreCliente}</Td>
                        <Td>{v.idCliente.cedulaCliente}</Td>
                        <Td>{v.precio_total}</Td>
                        <Td>{v.estadoVenta}</Td>
                        <Td>
                          <Button onClick={() => verDetalleVenta(v)} mr={2}>
                            <Flex gap={1} alignItems={"center"}>
                              <Box>Ver </Box> <IoEye />
                            </Flex>
                          </Button>
                          <Button>
                            <Flex gap={1} alignItems={"center"}>
                              <Box>Anular</Box>
                              <TiCancel />
                            </Flex>
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
      <DetalleVentaModal detalleVentaModal={detalleVentaModal} />
    </>
  );
}

export default ListVentaModal;
