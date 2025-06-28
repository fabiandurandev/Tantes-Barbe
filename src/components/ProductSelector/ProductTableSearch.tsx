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
import useProductsStore from "../../contexts/store";

type Props = {
  data?: ProductType[];
};

function ProductTableSearch({ data }: Props) {
  const { add, quantity, products, addQuantity } = useProductsStore();

  const onClick = (p: ProductType) => {
    if (
      products.some((product) => p.codigoProducto === product.codigoProducto)
    ) {
      const i = products.findIndex(
        (product) => product.codigoProducto === p.codigoProducto
      );
      addQuantity(i, products[i]);
    } else {
      quantity.push(1);
      console.log(quantity);
      add(p);
    }
  };

  console.log(products);

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
          {data?.map((p, index) => (
            <Tr key={index}>
              <Td>{p.codigoProducto}</Td>
              <Td onClick={() => onClick(p)} cursor={"pointer"}>
                {p.nombreProducto}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductTableSearch;
