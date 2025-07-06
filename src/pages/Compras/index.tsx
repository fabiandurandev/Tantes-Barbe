import {
  Box,
  HStack,
  Button,
  useColorModeValue,
  Flex,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import SupplierProductSelector from "../../components/SupplierProductSelector";
import SupplierSearch from "../../components/SupplierSearch";

const ServiceMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

  return (
    <>
      <SupplierSearch />
      <SupplierProductSelector />
    </>
  );
};

export default ServiceMenu;
