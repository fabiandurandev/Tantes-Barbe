import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import UseProductsSearch from "../../hooks/UseProductsSearch";
import { productSchema, type ProductSearchForm } from "../../schemas/Product";
import SkeletonProduct from "../skeletons/SkeletonProduct";
import ProductTableSearch from "./ProductTableSearch";

function ProductSearch() {
  const [busqueda, setBusqueda] = useState<string | undefined>("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ProductSearchForm>({
    resolver: zodResolver(productSchema),
  });

  const {
    data: dataProducts,
    error,
    isLoading,
    refetch: refetchProduct,
  } = UseProductsSearch(busqueda);

  const onSubmit = () => {
    setBusqueda(getValues("productName")); // actualiza la búsqueda
    setMostrarResultados(true); // muestra resultados
    refetchProduct(); // lanza la búsqueda
    reset(); // limpia el input
  };

  const handleSeleccionarProducto = () => {
    setMostrarResultados(false); // oculta la tabla al seleccionar
  };

  if (error) return <p>{error?.message}</p>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel m={2} color={"gray.400"}>
            Producto
          </FormLabel>
          <Flex mx={1}>
            <Input
              {...register("productName")}
              flex={"8"}
              size={"sm"}
              border={"1px"}
            />
            <Button
              onClick={() => setBusqueda(getValues("productName"))}
              type="submit"
              size={"sm"}
              flex={"2"}
              bg={"transparent"}
            >
              <FaSearch size={20} color="#2E66E1" />
            </Button>
          </Flex>
          {errors.productName?.message && (
            <Text color={"red.400"}>{errors.productName?.message}</Text>
          )}

          {isLoading ? (
            <SkeletonProduct />
          ) : !mostrarResultados ? null : dataProducts?.length === 0 ? (
            <Text>Productos no encontrados</Text>
          ) : (
            <Box
              border={"1px"}
              mx={"4px"}
              mt={"4px"}
              overflow={"auto"}
              maxH={"370px"}
            >
              <ProductTableSearch
                dataProducts={dataProducts}
                onSelect={handleSeleccionarProducto}
              />
            </Box>
          )}
        </FormControl>
      </form>
    </>
  );
}

export default ProductSearch;
