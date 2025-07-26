import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  cambiarContrasenaSchema,
  type cambiarContrasenaSchemaType,
} from "./schemaCambiarContrasena";
import UseRegistrarUsuario from "./UseCambiarContrasena";
import useCambiarContrasena from "./UseCambiarContrasena";

export default function CambiarContrasena() {
  useEffect(() => {
    const token = localStorage.getItem("token_temporal");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<cambiarContrasenaSchemaType>({
    resolver: zodResolver(cambiarContrasenaSchema),
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showPassword2, setShowPassword2] = useState(false);

  const { mutate } = useCambiarContrasena();

  const onSubmit = async (data: cambiarContrasenaSchemaType) => {
    await mutate({ nueva_contrasena: data.password });
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
          Cambiar contraseña.
        </Text>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "80%", justifyItems: "center" }}
        >
          {/* Campos del formulario */}

          <FormControl
            isInvalid={!!errors.password}
            id="password"
            mb={4}
            w="100%"
            maxW="400px"
          >
            <FormLabel>Contraseña:</FormLabel>
            <InputGroup>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  _hover={{}}
                  variant="ghost"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={!!errors.confirmarPassword}
            id="confirmarPassword"
            mb={4}
            w="100%"
            maxW="400px"
          >
            <FormLabel>Confirmar contraseña:</FormLabel>
            <InputGroup>
              <Input
                {...register("confirmarPassword")}
                type={showPassword2 ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  _hover={{}}
                  variant="ghost"
                  aria-label={
                    showPassword2 ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  icon={showPassword2 ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword2(!showPassword2)}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              {errors.confirmarPassword?.message}
            </FormErrorMessage>
          </FormControl>

          <Flex gap={4}>
            <Button colorScheme="blue" type="submit">
              Cambiar
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
