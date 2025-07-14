import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Image,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { NavLink as RouterLink } from "react-router";
import logo from "../assets/logoPosibleFinal.png";
import SeleccionarFecharModal from "./Ventas/SeleccionarFechaModal";
import SeleccionarFechaCompraModal from "./Compras/SeleccionarCompraModal";

interface Props {
  children: React.ReactNode;
  to: string;
}

const Links = [
  { uri: "/", label: "Venta" },
  { uri: "/servicios", label: "Servicios" },
  { uri: "/productos", label: "Productos" },
  { uri: "/clientes", label: "Clientes" },
  { uri: "/empleados", label: "Empleados" },
  { uri: "/proveedores", label: "Proveedores" },
  { uri: "/compras", label: "Compras" },
];

const NavLink = (props: Props) => {
  const { children, to } = props;
  return (
    <Box
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "white",
        color: "black",
      }}
      color="white"
      transition="all 0.3s ease"
    >
      <RouterLink to={to}>{children}</RouterLink>
    </Box>
  );
};
//const bg={useColorModeValue("gray.100", "gray.900")}
export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const seleccionarFechaModal = useDisclosure();

  const seleccionarFechaCompraModal = useDisclosure();

  return (
    <>
      <Box bgGradient="linear(to-r, #354154, #2E66E1, #6CA4F3)" px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box alignContent={"flex-start"}>
              <Image src={logo} w="350px" objectFit="contain" />
            </Box>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink to={link.uri} key={link.uri}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex gap="5" alignItems={"center"} justifyContent={"space-between"}>
            <Button
              variant={"solid"}
              //colorScheme={"teal"}
              size={"sm"}
              leftIcon={<IoIosLogOut />}
            >
              Salir
            </Button>
            <FaRegUser color="white" size="25" />
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <RxHamburgerMenu color="white" size="25" />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={seleccionarFechaModal.onOpen}>
                  Reportes de Ventas
                </MenuItem>
                <SeleccionarFecharModal
                  seleccionarFechaModal={seleccionarFechaModal}
                />
                <MenuItem onClick={seleccionarFechaCompraModal.onOpen}>
                  Reportes de Compras
                </MenuItem>
                <SeleccionarFechaCompraModal
                  seleccionarFechaCompraModal={seleccionarFechaCompraModal}
                />
                <MenuDivider />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink to={link.uri} key={link.uri}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
