// icons
import SummarizeIcon from "@mui/icons-material/Summarize";
import DetailsIcon from "@mui/icons-material/Details";
import AddIcon from "@mui/icons-material/Add";

import { TabList, Tab, Card, Text, Metric } from "@tremor/react";
import styles from "./styles/dashboard.module.css";
import { useState } from "react";

import Summary from "../components/Summary";
import Detailed from "../components/Detailed";
import AddNew from "../components/AddNew";

import { Button, Box } from "@mui/material";

export default () => {
  const [showCard, setShowCard] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.container}>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text>Total Spent</Text>
            <Metric>$ 442,276</Metric>
          </div>

          <Button onClick={handleOpen}>
            Add new <AddIcon />
          </Button>
        </Box>

        <TabList
          defaultValue={1}
          handleSelect={(value) => setShowCard(value === 1)}
          marginTop="mt-6"
        >
          <Tab value={1} text="Summary" icon={SummarizeIcon} />
          <Tab value={2} text="Detailed report" icon={DetailsIcon} />
        </TabList>

        <div className={styles.contentContainer}>
          {showCard === true ? <Summary /> : <Detailed />}
        </div>
      </Card>

      <AddNew open={open} handleClose={handleClose} />
    </div>
  );
};
