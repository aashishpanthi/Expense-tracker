import { Helmet, HelmetProvider } from "react-helmet-async";
import { forwardRef } from "react";
import { Box } from "@mui/material";

const Page = forwardRef(({ children, title = "", meta, ...other }, ref) => (
  <HelmetProvider>
    <Helmet>
      <title>{`${title} | Budgetly`}</title>
      {meta}
    </Helmet>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </HelmetProvider>
));

export default Page;
