import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

type Props = {};

function ClientSearch({}: Props) {
  return (
    <>
      <Flex h={60} m="3" gap={3}>
        <Box border="1px" borderColor="black" borderRadius="md" flex={7}>
          <Heading size={"lg"} ml={4} mt={2}>
            Datos del cliente
          </Heading>
        </Box>
        <Box alignContent={"center"} flex={3} justifyItems={"center"}>
          <FormControl>
            <FormLabel color={"gray.400"} ml={2}>
              Cédula:
            </FormLabel>
            <Flex w={"100%"} p={2} gap={1}>
              <Input
                flex={"7"}
                size={"md"}
                placeholder="Ingrese la cédula del cliente"
                border={"1px"}
              />
              <Button size={"md"} flex={"3"} bg={"transparent"}>
                <FaSearch size={20} color="#2E66E1" />
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
}

export default ClientSearch;
