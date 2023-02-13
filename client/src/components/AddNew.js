import { useState } from "react";
import ExpenseModal from "./ExpenseModal";
import { TextField, Stack, Button, Autocomplete } from "@mui/material";

import categories from "../utils/categories";
import moment from "moment";
import axios from "../utils/axios";
import { useUserEmail } from "@nhost/react";

function AddNew({ open, handleClose, update }) {
  const [values, setValues] = useState({
    expenseName: "",
    category: "",
    amount: "",
    date: moment(),
    description: "",
  });

  const [error, setError] = useState("");

  const userEmail = useUserEmail();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const id = `${new Date().getTime()}09812391728974874387787`.slice(0, 24);

    try {
      const expense = {
        id: id,
        ...values,
        user: userEmail,
      };

      await axios.post("api/Expense", expense);

      handleClose();
      update((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <ExpenseModal open={open} handleClose={handleClose}>
      <form>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 1 }}
          alignItems="center"
          justifyContent="space-between"
          my={2}
        >
          <TextField
            fullWidth
            required
            name="expenseName"
            type="text"
            label="Name"
            onChange={handleInputChange}
            value={values.expenseName}
          />
          <TextField
            required
            fullWidth
            name="amount"
            type="number"
            label="Amount"
            onChange={handleInputChange}
            value={values.amount}
          />

          <TextField
            id="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleInputChange}
            value={moment(values.date).format("YYYY-MM-DD")}
            fullWidth
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 1 }}
          alignItems="center"
          justifyContent="space-between"
          my={2}
        >
          <TextField
            fullWidth
            name="description"
            required
            type="text"
            label="Description"
            onChange={handleInputChange}
            value={values.description}
          />
          <Autocomplete
            fullWidth
            required
            id="category-select"
            options={categories}
            name="cetegory"
            value={values?.category}
            onChange={(_, value) => {
              handleInputChange({
                target: {
                  name: "category",
                  value,
                },
              });
            }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </Stack>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        <Button
          variant="contained"
          type="submit"
          onClick={handleSave}
          style={{
            marginLeft: "auto",
            display: "block",
          }}
        >
          Add
        </Button>
      </form>
    </ExpenseModal>
  );
}

export default AddNew;
