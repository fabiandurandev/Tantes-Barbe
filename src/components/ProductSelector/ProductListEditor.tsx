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

type Props = {};

function ProductListEditor({}: Props) {
  const th = ["N°", "Código", "Descripción", "Cantidad", "Quitar"];

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
                w={index == 2 ? "50%" : "auto"}
              >
                {t}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
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
                      2
                    </Box>
                  </GridItem>
                  <GridItem
                    p={0}
                    m={0}
                    borderBottom={"1px"}
                    colSpan={1}
                    bg="blue.400"
                  >
                    <Buttons tipo="addProduct"></Buttons>
                  </GridItem>
                  <GridItem colSpan={1} bg="blue.400">
                    <Buttons tipo="minusProduct"></Buttons>
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
                <Buttons tipo="deleteProduct"></Buttons>
              </Box>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductListEditor;
