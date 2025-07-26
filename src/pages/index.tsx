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
import OlvidarContrasena from "./OlvidarContrasena";
import VerificarCodigo from "./VerificarCodigo";
import CambiarContrasena from "./CambiarContraseña";
import { ProtectedRouteWithRole } from "./ProtectedRouteWithRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // para validar login
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "clientes", element: <Clientes /> },

          // Solo para ADMIN
          {
            path: "",
            element: <ProtectedRouteWithRole allowedRoles={["ADMIN"]} />,
            children: [
              { path: "servicios", element: <Servicios /> },
              { path: "productos", element: <Productos /> },
              { path: "empleados", element: <Empleados /> },
              { path: "proveedores", element: <Proveedores /> },
              { path: "compras", element: <Compras /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/registrarse", element: <RegistrarsePage /> },
  { path: "/recuperar-contrasena", element: <OlvidarContrasena /> },
  { path: "/verificar-codigo", element: <VerificarCodigo /> },
  { path: "/cambiar-contrasena", element: <CambiarContrasena /> },
]);

export default router;
