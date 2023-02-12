import React from "react";
import Charts from "./Charts";

function Summary({ data, expense }) {
  return (
    <div>
      {data[0] ? (
        <Charts data={data} expense={expense} />
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

export default Summary;
