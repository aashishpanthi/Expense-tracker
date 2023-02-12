import React from "react";

function Summary({ data }) {
  return (
    <div>
      {data[0] ? (
        <div>Summary</div>
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
