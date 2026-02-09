import { Outlet } from "react-router-dom";
import MainNavigation from "../components/UI/MainNavigation";
import AuthContextProvider from "../store/AuthContext";

export default function Root() {
  return (
    <AuthContextProvider>
      <MainNavigation />
      <Outlet />
    </AuthContextProvider>
  )
}