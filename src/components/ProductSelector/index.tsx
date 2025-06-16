import { Flex, Box } from "@chakra-ui/react";
import ProductSearch from "./ProductSearch";
import ProductListEditor from "./ProductListEditor";

type Props = {};

function index({}: Props) {
  return (
    <Flex mx={3} pb={3} h="calc(100vh - 344px)">
      <Box border={"1px"} flex={2.5}>
        <ProductSearch />
      </Box>
      <Box border={"1px"} flex={7.5}>
        <ProductListEditor />
      </Box>
    </Flex>
  );
}

export default index;
