import axios from "axios";
import type { ServiceType } from "../types";
import { useQuery } from "@tanstack/react-query";

const queryServicesList = (): Promise<ServiceType[]> => {
  const url = "http://127.0.0.1:8000/servicios";
  return axios.get(url).then((response) => response.data);
};

function UseListServices() {
  return useQuery({
    queryKey: ["servicesList"],
    queryFn: () => queryServicesList(),
    enabled: false,
  });
}

export default UseListServices;
