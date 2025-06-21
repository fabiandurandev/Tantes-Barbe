import { createBrowserRouter } from "react-router";
import Layout from "../Layout";
import Home from "./Home";
import Servicios from "./Servicios";

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
    ],
  },
]);

export default router;
