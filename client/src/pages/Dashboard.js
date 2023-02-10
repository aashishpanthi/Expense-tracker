import SummarizeIcon from "@mui/icons-material/Summarize";
import DetailsIcon from "@mui/icons-material/Details";

import { TabList, Tab, Card, Text, Metric } from "@tremor/react";
import styles from "./styles/dashboard.module.css";
import { useState } from "react";

import Summary from "../components/Summary";
import Detailed from "../components/Detailed";

export default () => {
  const [showCard, setShowCard] = useState(true);

  return (
    <div className={styles.container}>
      <Card>
        <>
          <Text>Total Spent</Text>
          <Metric>$ 442,276</Metric>
          <TabList
            defaultValue={1}
            handleSelect={(value) => setShowCard(value === 1)}
            marginTop="mt-6"
          >
            <Tab value={1} text="Summary" icon={SummarizeIcon} />
            <Tab value={2} text="Detailed report" icon={DetailsIcon} />
          </TabList>
        </>

        <div className={styles.contentContainer}>
          {showCard === true ? <Summary /> : <Detailed />}
        </div>
      </Card>
    </div>
  );
};
