import Store from "../components/Store/Store";
import StoreContextProvider from "../store/StoreContext";

export default function StoreRoute() {
  return (
    <StoreContextProvider>
      <Store />
    </StoreContextProvider>
  )
}