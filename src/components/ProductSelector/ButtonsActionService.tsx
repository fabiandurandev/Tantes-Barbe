import { Button } from "@chakra-ui/react";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import type { ProductType, ServiceType } from "../../types";

type Props = {
  tipo: "minusProduct" | "addProduct" | "deleteProduct";
  addQuantity?: (i: number, service: ServiceType) => void;
  subtractQuantity?: (i: number) => void;
  remove?: (codigo: number, index: number) => void;
  index: number;
  service: ServiceType;
};

const iconos = {
  minusProduct: <FaMinus />,
  addProduct: <IoMdAdd size="20" />,
  deleteProduct: <IoIosCloseCircle color="Red" size={"26"} />,
};

function ButtonsActionService({
  tipo,
  addQuantity,
  index,
  service,
  remove,
  subtractQuantity,
}: Props) {
  const actions = {
    addProduct: () => addQuantity?.(index, service),
    minusProduct: () => subtractQuantity?.(index),
    deleteProduct: () => remove?.(service.codigoServicio, index),
  };

  return (
    <Button
      onClick={() => actions[tipo]?.()}
      height={"100%"}
      w={"100%"}
      p={0}
      m={0}
      borderRadius={"none"}
      bg={"transparent"}
    >
      {iconos[tipo]}
    </Button>
  );
}

export default ButtonsActionService;
