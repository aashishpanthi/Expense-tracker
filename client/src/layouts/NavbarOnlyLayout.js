import React from "react";
import { Outlet } from "react-router-dom";
import { useAuthenticationStatus } from "@nhost/react";
import { CircularProgress } from "@mui/material";

import Navbar from "../components/Navbar";

function NavbarOnlyLayout({ nhost }) {
  const { isLoading } = useAuthenticationStatus();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Navbar nhost={nhost} />

      <Outlet />
    </>
  );
}

export default NavbarOnlyLayout;
