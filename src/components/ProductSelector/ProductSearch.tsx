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
import UseServiceSearch from "../../hooks/UseServicesSearch";

type Props = {};

function ProductSearch({}: Props) {
  const [busqueda, setBusqueda] = useState<string>("");

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

  const {
    data: dataServices,

    refetch: refetchService,
  } = UseServiceSearch(busqueda);

  const onSubmit = async () => {
    await Promise.all([refetchProduct(), refetchService()]);
    reset();
  };

  if (error) return <p>{error?.message}</p>;
  if (isLoading) {
    return (
      <>
        <FormControl>
          <FormLabel m={2} color={"gray.400"}>
            Servicio/Producto
          </FormLabel>
          <Flex mx={1}>
            <Input flex={"8"} size={"sm"} border={"1px"} />
            <Button size={"sm"} flex={"2"} bg={"transparent"}>
              <FaSearch size={20} color="#2E66E1" />
            </Button>
          </Flex>
        </FormControl>
        <SkeletonProduct />
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel m={2} color={"gray.400"}>
            Servicio/Producto
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
          {dataProducts === undefined && dataServices === undefined ? (
            ""
          ) : dataProducts?.length === 0 && dataServices?.length === 0 ? (
            <Text>Productos y servicios no encontrados</Text>
          ) : (
            <Box
              border={"1px"}
              mx={"4px"}
              mt={"4px"}
              overflow={"auto"}
              maxH={"370"}
            >
              <ProductTableSearch
                dataProducts={dataProducts}
                dataServices={dataServices}
              />
            </Box>
          )}
        </FormControl>
      </form>
    </>
  );
}

export default ProductSearch;
