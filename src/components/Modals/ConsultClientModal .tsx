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
  ModalFooter,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useClientStore } from "../../contexts/store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ListClientModal({ isOpen, onClose }: Props) {
  const { clients, resetClients } = useClientStore();
  const queryClient = useQueryClient();

  const handleClose = () => {
    resetClients();
    queryClient.removeQueries({ queryKey: ["clientsList"] });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius="2xl"
        maxW="80vw"
        maxH="70vh"
        overflowY="auto"
        bg="white"
        boxShadow="xl"
      >
        <ModalHeader
          bg="blue.600"
          color="white"
          borderTopRadius="2xl"
          textAlign="center"
          fontWeight="bold"
          fontSize="xl"
          py={4}
        >
          Consulta de Clientes
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody px={6} py={4}>
          {clients && clients.length > 0 ? (
            <TableContainer>
              <Table variant="striped" colorScheme="blue" size="md">
                <Thead>
                  <Tr>
                    <Th>Cédula</Th>
                    <Th>Nombre</Th>
                    <Th>Teléfono</Th>
                    <Th>Dirección</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {clients.map((c) => (
                    <Tr key={c.cedulaCliente}>
                      <Td>{c.cedulaCliente}</Td>
                      <Td>{c.nombreCliente}</Td>
                      <Td>{c.telefonoCliente}</Td>
                      <Td>{c.direccionCliente}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <Box textAlign="center" py={10}>
              <Text color="gray.500" fontSize="lg">
                No hay clientes para mostrar.
              </Text>
            </Box>
          )}
        </ModalBody>
        <ModalFooter justifyContent="center" pb={6}>
          <Button
            colorScheme="blue"
            fontWeight="bold"
            px={8}
            py={2}
            borderRadius="md"
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ListClientModal;