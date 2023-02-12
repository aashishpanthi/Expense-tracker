import React from "react";
import { DonutChart, LineChart } from "@tremor/react";

function Charts({ data, expense }) {
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  return (
    <>
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

      {/* <LineChart
        data={expense}
        categories={["amount"]}
        dataKey="date"
        colors={["blue"]}
        valueFormatter={valueFormatter}
        startEndOnly={false}
        showXAxis={true}
        showYAxis={true}
        autoMinValue={false}
        yAxisWidth="w-14"
        showTooltip={true}
        showLegend={true}
        showGridLines={true}
        showAnimation={true}
        height="h-80"
        marginTop="mt-0"
      /> */}
    </>
  );
}

export default Charts;
