import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSupplierProductsStore } from "../../contexts/store";
import type { ProductType } from "../../types";

type Props = {
  dataProducts?: ProductType[];
  onSelect?: () => void;
};

function ProductTableSearch({ dataProducts, onSelect }: Props) {
  const {
    add: addProduct,
    quantity: quantityProduct,
    products,
    addQuantity: addQuantityProducts,
  } = useSupplierProductsStore();

  const onClickProduct = (p: ProductType) => {
    if (
      products.some((product) => p.codigoProducto === product.codigoProducto)
    ) {
      const i = products.findIndex(
        (product) => product.codigoProducto === p.codigoProducto
      );
      addQuantityProducts(i, p);
    } else {
      quantityProduct.push(1);
      addProduct(p);
    }

    if (onSelect) onSelect();
  };

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
          {dataProducts?.map((p, index) => (
            <Tr key={index}>
              <Td>{p.codigoProducto}</Td>
              <Td onClick={() => onClickProduct(p)} cursor={"pointer"}>
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
