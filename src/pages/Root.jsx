import { Outlet } from "react-router-dom";
import MainNavigation from "../components/UI/MainNavigation";

export default function Root() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  )
}