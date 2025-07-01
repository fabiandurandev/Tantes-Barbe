import axios from "axios";
import type { ServiceType } from "../types";
import { useQuery } from "@tanstack/react-query";

const queryServices = (params: string | undefined): Promise<ServiceType[]> => {
  const url = "http://127.0.0.1:8000/servicios";
  return axios
    .get(url, {
      params: params ? { nombreServicio__icontains: params } : {},
    })
    .then((response) => response.data);
};

function UseServiceSearch(params: string | undefined) {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => queryServices(params),
    enabled: false,
  });
}

export default UseServiceSearch;
