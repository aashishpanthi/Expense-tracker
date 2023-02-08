import React from "react";
import Routes from "./routes";

import { NhostClient, NhostProvider } from "@nhost/react";

function App() {
  const nhost = new NhostClient({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION,
  });

  return (
    <NhostProvider nhost={nhost}>
      <Routes host={nhost} />
    </NhostProvider>
  );
}

export default App;
