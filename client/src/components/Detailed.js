import React from "react";
import ExpenseTable from "./ExpenseTable";

function Detailed({ data }) {
  return (
    <div>
      {data[0] ? (
        <ExpenseTable data={data} />
      ) : (
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          No expenses yet. Add one by clicking the button above.
        </p>
      )}
    </div>
  );
}

export default Detailed;
