import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import CancelSaleModal from "../Modals/CancelSaleModal";

type Props = {};

function ButtonsSend({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    </>
  );
}

export default ButtonsSend;
