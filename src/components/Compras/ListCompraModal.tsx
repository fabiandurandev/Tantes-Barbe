import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
import type { ComprasType } from "../../types";
import { UseComprasStore, UseDetalleCompra } from "./store";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DetalleCompraModal from "./CompraDetalleModal";
import CancelCompraModal from "./AnularCompraModal";
import { useState } from "react";

type Props = {
  ListCompraModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

function ListCompraModal({ ListCompraModal }: Props) {
  const { compras, resetCompras } = UseComprasStore();

  const { setCompra } = UseDetalleCompra();

  const queryClient = useQueryClient();

  const detalleCompraModal = useDisclosure();

  const anularCompraModal = useDisclosure();

  const onClose = () => {
    queryClient.removeQueries({ queryKey: ["ventasFecha"] });
    resetCompras();
    ListCompraModal.onClose();
  };

  const verDetalleCompra = (compra: ComprasType) => {
    setCompra(compra);
    detalleCompraModal.onOpen();
  };

  const nueva = (fecha: string) => {
    let fechaNueva = new Date(fecha);
    return fechaNueva?.toLocaleString("es-VE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const generarPDF = () => {
    const pdf = new jsPDF();

    const columnas = [
      "Compra",
      "Fecha",
      "Proveedor",
      "Rif proveedor",
      "Total",
      "Estado",
    ];

    const filas = compras?.map((c) => [
      c.id,
      nueva(c.fecha),
      c.idProveedor.nombreProveedor,
      c.idProveedor.rifProveedor,
      `$${c.precio_total}`,
      c.estadoCompra,
    ]);

    autoTable(pdf, {
      head: [columnas],
      body: filas,
      styles: {
        halign: "center",
        fontSize: 10,
      },
      theme: "striped",
      headStyles: {
        fillColor: [45, 100, 223], // Azul
        textColor: 255,
        fontStyle: "bold",
      },
      margin: { top: 20 },
    });

    pdf.save("reporte de compras.pdf");
  };

  const [idCompraAnular, setIdCompraAnular] = useState<number>(0);

  const anularCompra = (idCompra: number) => {
    anularCompraModal.onOpen();
    setIdCompraAnular(idCompra);
  };

  return (
    <>
      <Modal isOpen={ListCompraModal.isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" width="85vw" height="70vh" maxW="none">
          <ModalHeader
            borderTopRadius="2xl"
            color="white"
            bgColor="blue.600"
            textAlign="center"
          >
            COMPRAS
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflow="auto">
            <TableContainer>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr fontWeight="extrabold" fontSize="2xl">
                    <Th fontWeight="extrabold" fontSize="medium">
                      Compra
                    </Th>
                    <Th fontWeight="extrabold" fontSize="medium">
                      Fecha
                    </Th>
                    <Th fontWeight="extrabold" fontSize="medium">
                      Proveedor
                    </Th>
                    <Th fontWeight="extrabold" fontSize="medium">
                      Rif proveedor
                    </Th>
                    <Th fontWeight="extrabold" fontSize="medium">
                      Total
                    </Th>
                    <Th fontWeight="extrabold" fontSize="medium">
                      Estado
                    </Th>
                    <Th fontWeight="extrabold" fontSize="medium">
                      Acciones
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {compras !== undefined &&
                    compras.map((c) => (
                      <Tr key={c.id}>
                        <Td>{c.id}</Td>
                        <Td>{nueva(c.fecha)}</Td>
                        <Td>{c.idProveedor.nombreProveedor}</Td>
                        <Td>{c.idProveedor.rifProveedor}</Td>
                        <Td>${c.precio_total}</Td>
                        <Td>{c.estadoCompra}</Td>
                        <Td>
                          <Button onClick={() => verDetalleCompra(c)} mr={2}>
                            <Flex gap={1} alignItems="center">
                              <Box>Ver</Box>
                              <IoEye />
                            </Flex>
                          </Button>
                          {c.estadoCompra === "VAL" ? (
                            <Button onClick={() => anularCompra(c.id)}>
                              <Flex gap={1} alignItems="center">
                                <Box>Anular</Box>
                                <TiCancel />
                              </Flex>
                            </Button>
                          ) : (
                            ""
                          )}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              onClick={generarPDF}
              _hover={{ opacity: 0.6 }}
              color="white"
              mt={2}
              bgColor="#2D64DF"
            >
              Descargar reporte
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DetalleCompraModal detalleCompraModal={detalleCompraModal} />
      <CancelCompraModal
        idCompra={idCompraAnular}
        anularCompraModal={anularCompraModal}
        listCompraModal={ListCompraModal}
      />
    </>
  );
}

export default ListCompraModal;
