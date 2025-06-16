import { Button } from "@chakra-ui/react";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";

type Props = {
  tipo: "minusProduct" | "addProduct" | "deleteProduct";
};

const iconos = {
  minusProduct: <FaMinus />,
  addProduct: <IoMdAdd size="20" />,
  deleteProduct: <IoIosCloseCircle color="Red" size={"26"} />,
};

function Buttons({ tipo }: Props) {
  return (
    <Button
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
