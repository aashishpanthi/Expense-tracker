import React from "react";
import ExpenseTable from "./ExpenseTable";

function Detailed({ update, data }) {
  return (
    <div>
      {data[0] ? (
        <ExpenseTable update={update} data={data} />
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
