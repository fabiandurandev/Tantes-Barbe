import { Box, HStack, Button, useColorModeValue, Flex, Text, VStack, Image, useDisclosure } from "@chakra-ui/react";
import AddClient from "../../components/Modals/AddClient";
import UpdateClient from "../../components/Modals/UpdateClient";
import ListClientModal from "../../components/Modals/ConsultClientModal ";

const ServiceMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose
  } = useDisclosure();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose
  } = useDisclosure();

  const {
    isOpen: isListOpen,
    onOpen: onListOpen,
    onClose: onListClose
  } = useDisclosure();


  return (
     <Flex
      minH="75vh"          
      direction="column"    
      justify="center"      
      align="center"        
      p={6}
    >
    <Box p={6} maxW="4xl" mx="auto" textAlign="center">
      
      
      <HStack spacing={20} justify="center">
        <VStack>
        <Button
          size="lg"
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          minW="300px"
          minH="300px"
          leftIcon={
            <Image 
            src="/img/agregar.png" 
            boxSize="180px"
            alt="Agregar"
            />
            }
            onClick={onAddOpen}
        >
        </Button>
        <Text fontWeight="bold" fontSize="lg">AGREGAR NUEVO CLIENTE</Text>
        </VStack>

        Icon={
            <Image 
            src="/img/linea.png" 
            boxSize="180px"
            alt="Agregar"
            />
            }
        
        <VStack>
        <Button
          size="lg"
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          minW="300px"
          minH="300px"
          leftIcon={
            <Image 
            src="/img/modificar.png" 
            boxSize="180px"
            alt="Modificar"
            />
            }
            onClick={onUpdateOpen}
        >
        </Button>
        <Text fontWeight="bold" fontSize="lg">MODIFICAR CLIENTE</Text>
        </VStack>
        
        Icon={
            <Image 
            src="/img/linea.png" 
            boxSize="180px"
            alt="Agregar"
            />
            }

        <VStack>
        <Button
          size="lg"
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          minW="300px"
          minH="300px"
          leftIcon={
            <Image 
            src="/img/consultar.png" 
            boxSize="180px"
            alt="Consultar"
            />
            }
            onClick={onListOpen}
        >
        </Button>
        <Text fontWeight="bold" fontSize="lg">CONSULTAR CLIENTE</Text>
        </VStack>
      </HStack>
    </Box>
    <AddClient isOpen={isAddOpen} onClose={onAddClose} />
    <UpdateClient isOpen={isUpdateOpen} onClose={onUpdateClose} />
    <ListClientModal isOpen={isListOpen} onClose={onListClose} />
    </Flex>
  );
};

export default ServiceMenu;