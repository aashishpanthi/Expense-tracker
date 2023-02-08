//make routes
import React from "react";
import { useRoutes } from "react-router-dom";

// layouts
import NavbarOnlyLayout from "./layouts/NavbarOnlyLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function Routes({ nhost }) {
  return useRoutes([
    {
      path: "/",
      element: <NavbarOnlyLayout nhost={nhost} />,
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "app", element: <Dashboard /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
}
