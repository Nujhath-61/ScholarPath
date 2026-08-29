import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;
  return children;
}