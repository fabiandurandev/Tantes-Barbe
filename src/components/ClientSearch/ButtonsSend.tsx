import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import useProductsStore, { useClientStore } from "../../contexts/store";
import CancelSaleModal from "../Modals/CancelSaleModal";
import { UseCreateSale } from "../../hooks/UseCreateSale";
import PayloadVenta from "../ProductSelector/PayloadVenta";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type Props = {};

function ButtonsSend({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products, quantity, resetSale } = useProductsStore();

  const { mutate: RegisterSale } = UseCreateSale();

  const { client, resetClient } = useClientStore();
  const payload = PayloadVenta(client, 1, products, quantity);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onClick = () => {
    RegisterSale(payload, {
      onSuccess: (data) => {
        console.log("Venta registrada: ", data);
        resetClient();
        resetSale();
        onClose();
        queryClient.removeQueries({ queryKey: ["client"] });
        navigate("/");
      },
    });

    products.length > 0 && console.log("productos Enviados");
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
