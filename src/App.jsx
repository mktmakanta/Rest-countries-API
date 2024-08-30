import CountryDetail from "./components/CountryDetail";
import SearchFilter from "./components/SearchFilter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <SearchFilter /> },
  { path: "/countrydetail/:countryTag", element: <CountryDetail /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
