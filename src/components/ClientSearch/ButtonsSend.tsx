import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import useProductsStore, {
  useClientStore,
  UseServicesStore,
} from "../../contexts/store";
import CancelSaleModal from "../Modals/CancelSaleModal";
import { UseCreateSale } from "../../hooks/UseCreateSale";
import PayloadVenta from "../ProductSelector/PayloadVenta";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type Props = {};

function ButtonsSend({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products, quantity, resetSale } = useProductsStore();

  const {
    services,
    quantity: quantityService,
    resetSale: resetSaleService,
  } = UseServicesStore();

  const { mutate: RegisterSale } = UseCreateSale();

  const { client, resetClient } = useClientStore();

  const payload = PayloadVenta(
    client,
    1,
    products,
    services,
    quantity,
    quantityService
  );

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const onClick = () => {
    RegisterSale(payload, {
      onSuccess: (data) => {
        resetClient();
        resetSale();
        resetSaleService();
        onClose();
        queryClient.removeQueries({ queryKey: ["client"] });
        navigate("/");
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
    </>
  );
}

export default ButtonsSend;
