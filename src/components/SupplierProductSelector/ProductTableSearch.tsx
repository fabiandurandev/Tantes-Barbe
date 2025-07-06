import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import type { ProductType, ServiceType } from "../../types";
import useProductsStore, {
  UseServicesStore,
  useSupplierProductsStore,
} from "../../contexts/store";

type Props = {
  dataProducts?: ProductType[];
};

function ProductTableSearch({ dataProducts }: Props) {
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
  };

  console.log(dataProducts);

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
