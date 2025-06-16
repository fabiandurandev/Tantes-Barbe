import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Props = {};

function ProductTableSearch({}: Props) {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead bg={"blue.400"}>
          <Tr>
            <Th
              borderRight="1px solid"
              borderRightColor="black"
              color={"black"}
            >
              Código
            </Th>
            <Th color={"black"}>Descripción</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductTableSearch;
