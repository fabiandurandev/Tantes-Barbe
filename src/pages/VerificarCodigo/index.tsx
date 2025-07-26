import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  verificarCodigoSchema,
  type verificarCodigoSchemaType,
} from "./schemaVerificarCodigo";
import useEmailStore from "./store";
import useSolicitarCodigo from "./UseVerificarCodigo";
import { useEffect } from "react";

export default function VerificarCodigo() {
  const navigate = useNavigate();

  useEffect(() => {
    const verificacionIniciada = localStorage.getItem("verificacion_iniciada");
    if (!verificacionIniciada) {
      // Si no vino de la pantalla anterior, lo rediriges
      navigate("/login"); // o donde tengas el formulario de email
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<verificarCodigoSchemaType>({
    resolver: zodResolver(verificarCodigoSchema),
  });

  const { mutate } = useSolicitarCodigo();

  const { email } = useEmailStore();

  const onSubmit = async (data: verificarCodigoSchemaType) => {
    await mutate({ codigo: data.codigo, email: email });
  };

  const cancelar = () => {
    resetForm();
    navigate("/login");
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage="url('/img/barberia_instrumentos_1.jpg')" // Coloca aquí tu imagen de fondo
      bgSize="cover"
      bgPosition="center"
    >
      {/* Formulario principal */}
      <Box
        w="80%"
        h="80%"
        bg={useColorModeValue("whiteAlpha.600", "blackAlpha.700")}
        borderRadius="2xl"
        boxShadow="2xl"
        position="relative"
        p={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        backdropFilter="blur(5px)"
      >
        {/* Logo en la esquina superior izquierda */}
        <Image
          src="/img/logoPosibleFinal.png" // Reemplaza con tu logo
          alt="Logo"
          position="absolute"
          top={-28}
          left={-12}
          boxSize={"400px"}
        />

        {/* Imagen de avatar */}
        <Image
          src="/img/usuario.png" // Opcional: avatar genérico
          alt="Avatar"
          borderRadius="full"
          boxSize="80px"
          mb={6}
        />

        {/* Título */}
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Verificar código.
        </Text>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "80%", justifyItems: "center" }}
        >
          {/* Campos del formulario */}
          <FormControl
            isInvalid={!!errors.codigo}
            id="email"
            mb={4}
            w="100%"
            maxW="400px"
          >
            <FormLabel>Código</FormLabel>
            <Input
              placeholder="Ingrese el codigo."
              _placeholder={{ color: "gray.300" }}
              {...register("codigo")}
              type="text"
            />
            <FormErrorMessage>{errors.codigo?.message}</FormErrorMessage>
          </FormControl>

          <Flex gap={4}>
            <Button colorScheme="blue" type="submit">
              Enviar
            </Button>
            <Button onClick={cancelar} colorScheme="gray">
              Cancelar
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
