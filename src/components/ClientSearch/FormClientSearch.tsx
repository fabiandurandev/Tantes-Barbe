import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { clientSchema, type ClientSearchFormType } from "../../schemas/Client";
import { zodResolver } from "@hookform/resolvers/zod";

const styleForm = {
  width: "100%",
  height: "100%",
  alignContent: "center",
};

type Props = {
  refetch: () => void;
  setCedula: (cdedula: number) => void;
};

function FormClientSearch({ refetch, setCedula }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ClientSearchFormType>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = () => {
    refetch();
    reset();
  };

  return (
    <form style={styleForm} onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel color={"gray.400"} ml={2}>
          Cédula:
        </FormLabel>
        <Flex gridRow={3} w={"100%"} p={2} gap={1}>
          <Input
            {...register("cedulaClient")}
            flex={"7"}
            size={"md"}
            placeholder="Ingrese la cédula del cliente"
            border={"1px"}
          />

          <Button
            onClick={() => setCedula(getValues("cedulaClient"))}
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
          {errors.cedulaClient?.message}
        </Text>
      )}
    </form>
  );
}

export default FormClientSearch;
