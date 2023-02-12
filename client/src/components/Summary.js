import React from "react";
import { DonutChart } from "@tremor/react";

function Summary({ data, expense }) {
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <div>
      {data[0] ? (
        <DonutChart
          data={data}
          category="amount"
          dataKey="expenseName"
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          variant="donut"
          valueFormatter={valueFormatter}
          label={valueFormatter(expense)}
          showLabel={true}
          showTooltip={true}
          showAnimation={true}
          height="h-44"
          marginTop="mt-0"
        />
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
