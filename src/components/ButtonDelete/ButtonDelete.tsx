import { Button, useDisclosure } from "@chakra-ui/react";
import { IoIosCloseCircle } from "react-icons/io";
import { UseDelete } from "../../hooks/UseDelete";
import ModalDecision from "./ModalDecision";

type Props = {
  codigoServicio: number;
  name: string;
  reset: () => void;
};

function ButtonDelete({ codigoServicio, name, reset }: Props) {
  const modalDecision = useDisclosure();

  const { mutate: deleteSome } = UseDelete();

  const onClick = () => {
    deleteSome({ codigo: codigoServicio, name: name });
    reset();
  };
  return (
    <>
      <Button
        onClick={modalDecision.onOpen}
        _hover={{}}
        height={"100%"}
        w={"100%"}
        p={0}
        m={0}
        borderRadius={"none"}
        bg={"transparent"}
      >
        <IoIosCloseCircle color="Red" size={"26"} />
      </Button>
      <ModalDecision onClick={onClick} ModalDecision={modalDecision} />
    </>
  );
}

export default ButtonDelete;
