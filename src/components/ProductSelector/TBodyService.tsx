import { Box, Grid, GridItem, Td, Tr } from "@chakra-ui/react";
import { UseServicesStore } from "../../contexts/store";
import Buttons from "./Buttons";
import ButtonsActionService from "./ButtonsActionService";

type Props = {};

function TBodyService({}: Props) {
  const { services, quantity, addQuantity, remove, subtractQuantity } =
    UseServicesStore();
  return services.map((s, index) => (
    <Tr key={index}>
      <Td>{index + 1}</Td>
      <Td>{s.codigoServicio}</Td>
      <Td>{s.precioServicio}</Td>
      <Td>{s.nombreServicio} </Td>
      <Td bg={"white"} h="55px" m={0} border={0} p={0}>
        <Box overflow={"hidden"} borderRadius={"xl"}>
          <Grid
            h={"55px"}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
          >
            <GridItem borderRight={"1px"} rowSpan={2} colSpan={2} bg="blue.400">
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
              <ButtonsActionService
                addQuantity={addQuantity}
                index={index}
                service={s}
                tipo="addProduct"
              ></ButtonsActionService>
            </GridItem>
            <GridItem colSpan={1} bg="blue.400">
              <ButtonsActionService
                subtractQuantity={subtractQuantity}
                service={s}
                index={index}
                tipo="minusProduct"
              ></ButtonsActionService>
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
          <ButtonsActionService
            remove={remove}
            service={s}
            index={index}
            tipo="deleteProduct"
          ></ButtonsActionService>
        </Box>
      </Td>
    </Tr>
  ));
}

export default TBodyService;
