import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ClientType } from "../types";

const queryClientList = (): Promise<ClientType[]> => {
  const url = "http://127.0.0.1:8000/clientes";
  return axios.get(url).then((response) => response.data);
};

function UseListClient() {
  return useQuery({
    queryKey: ["clientsList"],
    queryFn: () => queryClientList(),
    enabled: false,
  });
}

export default UseListClient;
