import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { EmployeeType } from "../types";

const queryEmployeeList = (): Promise<EmployeeType[]> => {
  const url = "http://127.0.0.1:8000/empleados";
  return axios.get(url).then((response) => response.data);
};

function UseListEmployees() {
  return useQuery({
    queryKey: ["employeesList"],
    queryFn: () => queryEmployeeList(),
    enabled: false,
  });
}

export default UseListEmployees;
