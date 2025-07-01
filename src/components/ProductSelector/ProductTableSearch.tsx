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
import useProductsStore, { UseServicesStore } from "../../contexts/store";

type Props = {
  dataProducts?: ProductType[];
  dataServices?: ServiceType[];
};

function ProductTableSearch({ dataProducts, dataServices }: Props) {
  const {
    add: addProduct,
    quantity: quantityProduct,
    products,
    addQuantity: addQuantityProducts,
  } = useProductsStore();

  const {
    add: addService,
    quantity: quantityService,
    services,
    addQuantity: addQuantityService,
  } = UseServicesStore();

  const onClickProduct = (p: ProductType) => {
    if (
      products.some((product) => p.codigoProducto === product.codigoProducto)
    ) {
      const i = products.findIndex(
        (product) => product.codigoProducto === p.codigoProducto
      );
      addQuantityProducts(i, products[i]);
    } else {
      quantityProduct.push(1);
      addProduct(p);
    }
  };

  const onClicService = (s: ServiceType) => {
    if (
      services.some((service) => s.codigoServicio === service.codigoServicio)
    ) {
      const i = services.findIndex(
        (service) => service.codigoServicio === s.codigoServicio
      );
      addQuantityService(i, services[i]);
    } else {
      quantityService.push(1);
      addService(s);
    }
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
          {dataServices?.map((s, index) => (
            <Tr key={index}>
              <Td>{s.codigoServicio}</Td>
              <Td onClick={() => onClicService(s)} cursor={"pointer"}>
                {s.nombreServicio}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductTableSearch;
