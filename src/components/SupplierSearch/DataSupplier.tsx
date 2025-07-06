import { Box, Text, Highlight } from "@chakra-ui/react";
import type { ClientType, SupplierType } from "../../types";

type Props = {
  data?: SupplierType;
};

function DataSupplier({ data }: Props) {
  return (
    <Box mt={2} ml={4}>
      <Text mb={4}>
        <Highlight query={"Nombre:"} styles={{ fontWeight: "bold" }}>
          {`Nombre: ${data?.nombreProveedor}`}
        </Highlight>
      </Text>
      <Text mb={4}>
        <Highlight query={"Rif:"} styles={{ fontWeight: "bold" }}>
          {`Rif: ${data?.rifProveedor}`}
        </Highlight>
      </Text>

      <Text mb={4}>
        <Highlight query={"Dirección:"} styles={{ fontWeight: "bold" }}>
          {`Dirección: ${data?.direccionProveedor}`}
        </Highlight>
      </Text>
      <Text mb={4}>
        <Highlight query={"Teléfono:"} styles={{ fontWeight: "bold" }}>
          {`Teléfono: ${data?.telefonoProveedor}`}
        </Highlight>
      </Text>
    </Box>
  );
}

export default DataSupplier;
