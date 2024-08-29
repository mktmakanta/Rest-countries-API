import CountryDetail from "./components/CountryDetail";
import SearchFilter from "./components/SearchFilter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", Element: <SearchFilter /> },
  { path: "/countrydetail", Element: <CountryDetail /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
