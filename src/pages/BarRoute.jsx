import BarFinder from "../components/BarFinder/BarFinder";
import BarFinderContextProvider from "../store/BarFinderContext";

export default function BarRoute() {
  return (
    <BarFinderContextProvider>
      <BarFinder />
    </BarFinderContextProvider>
  )
}