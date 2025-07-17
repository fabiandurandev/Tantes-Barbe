// DetalleVentaModal.tsx

import {
  Button,
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
} from "@chakra-ui/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { UseDetalleCompra } from "./store";

type Props = {
  detalleCompraModal: {
    isOpen: boolean;
    onClose: () => void;
  };
};

export default function DetalleCompraModal({ detalleCompraModal }: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const { compra } = UseDetalleCompra();

  const generarPDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${compra?.idProveedor.nombreProveedor} venta ${compra?.id}.pdf`);
  };

  let fecha = undefined;

  if (compra) {
    fecha = new Date(compra?.fecha);
  }

  const fechaFormateada = fecha?.toLocaleString("es-VE", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <Modal
      isOpen={detalleCompraModal.isOpen}
      onClose={detalleCompraModal.onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader textAlign="center">Detalle de la Venta</ModalHeader>
        <ModalCloseButton />
        <ModalBody bg="gray.50">
          <div
            ref={pdfRef}
            style={{
              padding: "30px",
              backgroundColor: "white",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2>Recibo</h2>
            <p>
              <strong>Cliente:</strong> {compra?.idProveedor?.nombreProveedor}
            </p>

            <p>
              <strong>Fecha:</strong> {fechaFormateada}
            </p>
            <TableContainer>
              <Table variant="striped" colorScheme="blue">
                <Thead>
                  <Tr fontWeight={"extrabold"} fontSize={"2xl"}>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Nombre
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Precio
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      Cantidad
                    </Th>
                    <Th fontWeight={"extrabold"} fontSize={"medium"}>
                      subtotal
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {compra?.itemsProductosCompra !== undefined &&
                    compra.itemsProductosCompra.map((item) => (
                      <Tr key={item.producto}>
                        <Td>{item.nombreProducto}</Td>
                        <Td>{item.precioProducto}</Td>
                        <Td>{item.cantidad}</Td>
                        <Td>{item.producto_subtotal}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <p>
              <strong>Total:</strong> ${compra?.precio_total}
            </p>
            <p>
              <strong>Total Bs:</strong> {compra?.precio_total_bs}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={generarPDF}>
            Descargar PDF
          </Button>
          <Button onClick={detalleCompraModal.onClose} ml={3}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
