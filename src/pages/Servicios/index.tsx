import React from 'react'

import { Box, HStack, Heading, Button, useColorModeValue, Flex, Stack, Center, Text, VStack, Image } from "@chakra-ui/react";

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
          px={10}
          py={20}
          fontSize="xl"
          fontWeight="bold"
          minW="200px"
          leftIcon={
            <Image 
            src="/img/agregar.png" 
            boxSize="120px"
            alt="Agregar"
            />
            }
        >
        </Button>
        <Text>AGREGAR NUEVO SERVICIO</Text>
        </VStack>
        
        <VStack>
        <Button
          size="lg"
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          px={10}
          py={20}
          fontSize="xl"
          fontWeight="bold"
          minW="200px"
          leftIcon={
            <Image 
            src="/img/modificar.png" 
            boxSize="120px"
            alt="Modificar"
            />
            }
        >
        </Button>
        <Text>MODIFICAR SERVICIO</Text>
        </VStack>
        
        <VStack>
        <Button
          size="lg"
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          px={10}
          py={20}
          fontSize="xl"
          fontWeight="bold"
          minW="200px"
          leftIcon={
            <Image 
            src="/img/consultar.png" 
            boxSize="120px"
            alt="Consultar"
            />
            }
        >
        </Button>
        <Text>CONSULTAR SERVICIO</Text>
        </VStack>
      </HStack>
    </Box>
    </Flex>
  );
};

export default ServiceMenu;