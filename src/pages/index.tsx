import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Home from "./Home";
import Servicios from "./Servicios";
import Productos from "./Productos";
import Clientes from "./Clientes";
import Empleados from "./Empleados";
import Proveedores from "./Proveedores";
import Compras from "./Compras";
import LoginPage from "./Login";
import ProtectedRoute from "./protectedRoute";
import RegistrarsePage from "./Registrarse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "/servicios", element: <Servicios /> },
          { path: "/productos", element: <Productos /> },
          { path: "/clientes", element: <Clientes /> },
          { path: "/empleados", element: <Empleados /> },
          { path: "/proveedores", element: <Proveedores /> },
          { path: "/compras", element: <Compras /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registrarse",
    element: <RegistrarsePage />,
  },
]);

export default router;
