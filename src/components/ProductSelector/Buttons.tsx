import { Button } from "@chakra-ui/react";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import type { ProductType } from "../../types";

type Props = {
  tipo: "minusProduct" | "addProduct" | "deleteProduct";
  addQuantity?: (i: number, product: ProductType) => void;
  subtractQuantity?: (i: number) => void;
  remove?: (codigo: number, index: number) => void;
  index: number;
  product: ProductType;
};

const iconos = {
  minusProduct: <FaMinus />,
  addProduct: <IoMdAdd size="20" />,
  deleteProduct: <IoIosCloseCircle color="Red" size={"26"} />,
};

function Buttons({
  tipo,
  addQuantity,
  index,
  product,
  remove,
  subtractQuantity,
}: Props) {
  const actions = {
    addProduct: () => addQuantity?.(index, product),
    minusProduct: () => subtractQuantity?.(index),
    deleteProduct: () => remove?.(product.codigoProducto, index),
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

export default Buttons;
