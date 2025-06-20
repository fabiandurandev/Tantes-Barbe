import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { ProductType } from "../../types";

type Props = {
  data?: ProductType[];
};

function ProductTableSearch({ data }: Props) {
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
          {data?.map((p) => (
            <Tr key={p.codigoProducto}>
              <Td>{p.codigoProducto}</Td>
              <Td>{p.nombreProducto}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductTableSearch;
