import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSupplierProductsStore,
  UseSupplierStoreUpdateDelete,
} from "../../contexts/store";
import PayloadCompra, { UseCreateCompra } from "../../hooks/UseCreateCompra";
import CancelSaleModal from "../Modals/CancelSaleModal";

type Props = {};

function ButtonsSend({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products, quantity, resetSale } = useSupplierProductsStore();

  const { mutate: RegisterCompra } = UseCreateCompra();

  const { supplier, resetSupplier } = UseSupplierStoreUpdateDelete();

  const payload = PayloadCompra(supplier, products, quantity);

  const queryClient = useQueryClient();

  const onClick = () => {
    RegisterCompra(payload, {
      onSuccess: () => {
        queryClient.resetQueries({ queryKey: ["supplier"] });
        queryClient.resetQueries({ queryKey: ["products"] });
        resetSupplier();
        resetSale();
        onClose();
      },
    });
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
          onClick={() => onClick()}
          disabled={products.length === 0}
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
