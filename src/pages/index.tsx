import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Home from "./Home";
import Servicios from "./Servicios";
import Productos from "./Productos";
import Clientes from "./Clientes";
import Empleados from "./Empleados";
import Proveedores from "./Proveedores";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/servicios",
        element: <Servicios />,
      },
      {
        path: "/productos",
        element: <Productos />,
      },
      {
        path: "/clientes",
        element: <Clientes />,
      },
      {
        path: "/empleados",
        element: <Empleados />,
      },
      {
        path: "/proveedores",
        element: <Proveedores />,
      },
    ],
  },
]);

export default router;
