import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import ProductTableSearch from "./ProductTableSearch";

type Props = {};

function ProductSearch({}: Props) {
  return (
    <>
      <FormControl>
        <FormLabel m={2} color={"gray.400"}>
          Servicio/Producto
        </FormLabel>
        <Flex mx={1}>
          <Input flex={"8"} size={"sm"} border={"1px"} />
          <Button size={"sm"} flex={"2"} bg={"transparent"}>
            <FaSearch size={20} color="#2E66E1" />
          </Button>
        </Flex>
      </FormControl>
      <Box border={"1px"} mx={"4px"} mt={"4px"} overflow={"auto"} maxH={"370"}>
        <ProductTableSearch />
      </Box>
    </>
  );
}

export default ProductSearch;
