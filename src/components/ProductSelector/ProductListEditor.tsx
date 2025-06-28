import {
  Box,
  Grid,
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Buttons from "./Buttons";
import useProductsStore from "../../contexts/store";
import { useState } from "react";
import type { ProductType } from "../../types";

type Props = {};

function ProductListEditor({}: Props) {
  //const { quantityProduct, setQuantityProduct } = useState<number[]>([]);

  const { products, quantity, addQuantity, remove, subtractQuantity } =
    useProductsStore();

  const [quantityProduct, setQuantityProduct] = useState([]);

  const addProductList = (i: number, p: ProductType) => {
    if (quantity[i] < p.stock) {
      quantity[i] === quantity[i] + 1;
    }
  };

  const th = ["N°", "Código", "Precio", "Descripción", "Cantidad", "Quitar"];

  console.log(quantity);

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue">
        <Thead>
          <Tr>
            {th.map((t, index) => (
              <Th
                key={index}
                borderRight="1px solid"
                borderRightColor="black"
                color={"black"}
                w={index == 3 ? "50%" : "auto"}
              >
                {t}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {products &&
            products.map((p, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{p.codigoProducto}</Td>
                <Td>{p.precioProducto}</Td>
                <Td>{p.nombreProducto} </Td>
                <Td bg={"white"} h="55px" m={0} border={0} p={0}>
                  <Box overflow={"hidden"} borderRadius={"xl"}>
                    <Grid
                      h={"55px"}
                      templateRows="repeat(2, 1fr)"
                      templateColumns="repeat(3, 1fr)"
                    >
                      <GridItem
                        borderRight={"1px"}
                        rowSpan={2}
                        colSpan={2}
                        bg="blue.400"
                      >
                        <Box
                          fontWeight={"bold"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          h="100%"
                          w="100%"
                        >
                          {quantity[index]}
                        </Box>
                      </GridItem>
                      <GridItem
                        p={0}
                        m={0}
                        borderBottom={"1px"}
                        colSpan={1}
                        bg="blue.400"
                      >
                        <Buttons
                          addQuantity={addQuantity}
                          index={index}
                          product={p}
                          tipo="addProduct"
                        ></Buttons>
                      </GridItem>
                      <GridItem colSpan={1} bg="blue.400">
                        <Buttons
                          subtractQuantity={subtractQuantity}
                          product={p}
                          index={index}
                          tipo="minusProduct"
                        ></Buttons>
                      </GridItem>
                    </Grid>
                  </Box>
                </Td>
                <Td bg={"white"} h="55px" m={0} border={0} p={0}>
                  <Box
                    fontWeight={"bold"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    h="100%"
                    w="100%"
                  >
                    <Buttons
                      remove={remove}
                      product={p}
                      index={index}
                      tipo="deleteProduct"
                    ></Buttons>
                  </Box>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductListEditor;
