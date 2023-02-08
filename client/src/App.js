import React from "react";
import Routes from "./routes";

import { NhostClient, NhostReactProvider } from "@nhost/react";

function App() {
  const nhost = new NhostClient({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION,
  });

  console.log({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION,
  });

  return (
    <NhostReactProvider nhost={nhost}>
      <Routes nhost={nhost} />
    </NhostReactProvider>
  );
}

export default App;
