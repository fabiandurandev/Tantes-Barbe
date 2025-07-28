import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { EmployeeType } from "../types";

const queryEmployeeList = (): Promise<EmployeeType[]> => {
  const url = "https://backend-proyecto-ing-soft-ii.onrender.com/empleados";
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
