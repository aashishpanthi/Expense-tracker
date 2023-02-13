// icons
import SummarizeIcon from "@mui/icons-material/Summarize";
import DetailsIcon from "@mui/icons-material/Details";
import AddIcon from "@mui/icons-material/Add";

import { TabList, Tab, Card, Text, Metric } from "@tremor/react";
import styles from "./styles/dashboard.module.css";
import { useEffect, useState } from "react";

import Summary from "../components/Summary";
import Detailed from "../components/Detailed";
import AddNew from "../components/AddNew";

import { useUserEmail } from "@nhost/react";

import { Button, Box } from "@mui/material";
import axios from "axios";

export default () => {
  const [showCard, setShowCard] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [expense, setExpense] = useState(0);

  const userEmail = useUserEmail();
  const [data, setData] = useState([]);

  const [update, setUpdate] = useState(0);

  const getAllExpenses = async () => {
    try {
      const allexpenses = await axios.get(
        "http://64.227.164.205:5000/api/Expense"
      );

      // filter by useremail
      const userexpenses = allexpenses.data.filter(
        (expense) => expense.user === userEmail
      );

      setData(userexpenses);

      // calculate total expense
      const totalExpense = userexpenses.reduce((acc, expense) => {
        return acc + expense?.amount;
      }, 0);

      totalExpense && setExpense(totalExpense);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllExpenses();
  }, [update]);

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
            <Metric>
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(expense)}
            </Metric>
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
          {showCard === true ? (
            <Summary expense={expense} data={data} />
          ) : (
            <Detailed update={setUpdate} data={data} />
          )}
        </div>
      </Card>

      <AddNew open={open} update={setUpdate} handleClose={handleClose} />
    </div>
  );
};
