import { Button, useDisclosure } from "@chakra-ui/react";
import { IoIosCloseCircle } from "react-icons/io";
import { UseDelete } from "../../hooks/UseDelete";
import ModalDecision from "./ModalDecision";
import { useNavigate } from "react-router";

type Props = {
  codigoServicio: number;
  name: string;
  reset: () => void;
  modalList: {
    onClose: () => void;
  };
};

function ButtonDelete({ codigoServicio, name, reset, modalList }: Props) {
  let redireccion = "";

  if (name === "cliente") {
    redireccion = "clientes";
  } else if (name === "proveedor") {
    redireccion = "proveedores";
  } else if (name === "producto") {
    redireccion = "productos";
  } else if (name === "servicio") {
    redireccion = "servicios";
  } else if (name === "empleado") {
    redireccion = "empleados";
  }

  const modalDecision = useDisclosure();

  const { mutate: deleteSome } = UseDelete();

  const navigate = useNavigate();

  const onClick = () => {
    deleteSome({ codigo: codigoServicio, name: name });
    reset();
    navigate(`/${redireccion}/`);
    modalList.onClose();
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
      <ModalDecision
        modalList={modalList}
        onClick={onClick}
        ModalDecision={modalDecision}
        name={name}
      />
    </>
  );
}

export default ButtonDelete;
