import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import useProductsStore, { UseServicesStore } from "../../contexts/store";
import UseListEmployees from "../../hooks/UseListEmployees";
import CancelSaleModal from "../Modals/CancelSaleModal";
import SelecionarEmpleado from "../Modals/SelecionarEmpleado";

type Props = {};

function ButtonsSend({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products } = useProductsStore();

  const { services } = UseServicesStore();

  const seleccionarEmpleadoModal = useDisclosure();

  const { refetch } = UseListEmployees();

  const onClick = () => {
    refetch();
    seleccionarEmpleadoModal.onOpen();
  };

  return (
    <>
      <Flex
        direction={"column"}
        gap={5}
        width={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button
          onClick={onClick}
          disabled={products.length === 0 && services.length === 0}
          width={"80%"}
          _hover={{ opacity: 0.6 }}
          color={"white"}
          bgColor={"#2D64DF"}
          borderRadius={"xl"}
        >
          CONFIRMAR VENTA
        </Button>
        <Button
          onClick={() => onOpen()}
          width={"80%"}
          _hover={{ opacity: 0.8 }}
          color={"white"}
          bgColor={"gray"}
          borderRadius={"xl"}
        >
          CANCELAR VENTA
        </Button>
      </Flex>
      <CancelSaleModal isOpen={isOpen} onClose={onClose} />
      <SelecionarEmpleado selecionarProductoModal={seleccionarEmpleadoModal} />
    </>
  );
}

export default ButtonsSend;
