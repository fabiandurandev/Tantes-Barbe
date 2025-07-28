import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ClientType } from "../types";

const queryClientList = (): Promise<ClientType[]> => {
  const url = "https://backend-proyecto-ing-soft-ii.onrender.com/clientes";
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
