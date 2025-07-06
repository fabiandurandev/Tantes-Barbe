import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import {
  supplierSearchSchema,
  type SupplierSearchFormType,
} from "../../schemas/SupplierSearchSchema";

const styleForm = {
  width: "100%",
  height: "100%",
  alignContent: "center",
};

type Props = {
  refetch: () => void;
  setRif: (rif: number) => void;
};

function FormClientSearch({ refetch, setRif }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<SupplierSearchFormType>({
    resolver: zodResolver(supplierSearchSchema),
  });

  const onSubmit = () => {
    refetch();
    reset();
  };

  return (
    <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel color={"gray.400"} ml={2}>
          Rif:
        </FormLabel>
        <Flex gridRow={3} w={"100%"} p={2} gap={1}>
          <Input
            {...register("rifProveedor")}
            flex={"7"}
            size={"md"}
            placeholder="Ingrese el rif del proveedor"
            border={"1px"}
          />

          <Button
            onClick={() => setRif(getValues("rifProveedor"))}
            type="submit"
            size={"md"}
            flex={"3"}
            bg={"transparent"}
          >
            <FaSearch size={20} color="#2E66E1" />
          </Button>
        </Flex>
      </FormControl>
      {errors && (
        <Text pl={2} color={"red.500"}>
          {errors.rifProveedor?.message}
        </Text>
      )}
    </form>
  );
}

export default FormClientSearch;
