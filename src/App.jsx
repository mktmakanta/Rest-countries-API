import { Children } from "react";
import CountryDetail from "./components/CountryDetail";
import SearchFilter from "./components/SearchFilter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeadTheme from "./components/HeadTheme";

const router = createBrowserRouter([
  {
    element: <HeadTheme />,
    children: [
      { path: "/", element: <SearchFilter /> },
      { path: "/countrydetail/:countryTag", element: <CountryDetail /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
