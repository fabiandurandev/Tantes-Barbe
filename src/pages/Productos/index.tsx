import { Box, HStack, Button, useColorModeValue, Flex, Text, VStack, Image } from "@chakra-ui/react";

const ServiceMenu = () => {
  const buttonBg = useColorModeValue("blue.500", "blue.200");
  const buttonColor = useColorModeValue("white", "gray.800");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.300");

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
        >
        </Button>
        <Text fontWeight="bold" fontSize="lg">AGREGAR NUEVO PRODUCTO</Text>
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
        >
        </Button>
        <Text fontWeight="bold" fontSize="lg">MODIFICAR PRODUCTO</Text>
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
        >
        </Button>
        <Text fontWeight="bold" fontSize="lg">CONSULTAR PRODUCTOS</Text>
        </VStack>
      </HStack>
    </Box>
    </Flex>
  );
};

export default ServiceMenu;