import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

type Props = {};

function Layout({}: Props) {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Layout;
