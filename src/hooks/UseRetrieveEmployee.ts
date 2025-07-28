import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { EmployeeType, ServiceType } from "../types";

const queryEmployee = async (cedulaEmpleado: number): Promise<EmployeeType> => {
  const url = `https://backend-proyecto-ing-soft-ii.onrender.com/empleado/${cedulaEmpleado}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw error;
    throw new Error("Error inesperado");
  }
};

function UseRetrieveEmployee(params: number) {
  return useQuery({
    queryKey: ["employee", params],
    queryFn: () => queryEmployee(params),
    enabled: false,
  });
}

export default UseRetrieveEmployee;
