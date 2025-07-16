import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Link,
  Image,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { loginSchema, type loginSchemaType } from "./schemaLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import useLogin from "./useLogin";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const loginMutation = useLogin();

  const onSubmit = async (data: loginSchemaType) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate("/"); // redirigir si todo va bien
    } catch (error) {}
  };

  const [showPassword, setShowPassword] = useState(false);

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
          Iniciar Sesión
        </Text>

        <form
          style={{ width: "80%", justifyItems: "center" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Campos del formulario */}
          <FormControl id="email" mb={4} w="100%" maxW="400px">
            <FormLabel>Correo Electrónico:</FormLabel>
            <Input {...register("email")} type="email" />
          </FormControl>

          <FormControl id="password" mb={4} w="100%" maxW="400px">
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
          </FormControl>
          <Flex gap={6}>
            <Link alignItems={"center"} color="white.500" fontSize="sm" mb={4}>
              Olvidé mi contraseña
            </Link>
            <Link
              as={RouterLink}
              to="/registrarse"
              alignItems={"center"}
              color="white.500"
              fontSize="sm"
              mb={4}
            >
              Registrarse
            </Link>
          </Flex>

          <Flex gap={4}>
            <Button colorScheme="blue" type="submit">
              Ingresar
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
