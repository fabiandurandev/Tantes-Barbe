import { Box, Text, Highlight } from "@chakra-ui/react";
import type { ClientType } from "../../types";

type Props = {
  data?: ClientType;
};

function DataClient({ data }: Props) {
  return (
    <Box mt={2} ml={4}>
      <Text mb={4}>
        <Highlight query={"Nombre:"} styles={{ fontWeight: "bold" }}>
          {`Nombre: ${data?.nombreCliente}`}
        </Highlight>
      </Text>
      <Text mb={4}>
        <Highlight query={"Cédula:"} styles={{ fontWeight: "bold" }}>
          {`Cédula: ${data?.cedulaCliente}`}
        </Highlight>
      </Text>

      <Text mb={4}>
        <Highlight query={"Dirección:"} styles={{ fontWeight: "bold" }}>
          {`Dirección: ${data?.direccionCliente}`}
        </Highlight>
      </Text>
      <Text mb={4}>
        <Highlight query={"Teléfono:"} styles={{ fontWeight: "bold" }}>
          {`Teléfono: ${data?.telefonoCliente}`}
        </Highlight>
      </Text>
    </Box>
  );
}

export default DataClient;
