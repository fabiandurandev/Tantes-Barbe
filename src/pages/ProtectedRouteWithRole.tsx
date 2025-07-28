import { Navigate, Outlet } from "react-router";

export const ProtectedRouteWithRole = ({
  allowedRoles,
}: {
  allowedRoles: string[];
}) => {
  const userRol = localStorage.getItem("rol");
  console.log("User role:", userRol);

  if (!allowedRoles.includes(userRol || "")) {
    return <Navigate to="/" replace />; // redirige si no tiene permiso
  }

  return <Outlet />;
};
