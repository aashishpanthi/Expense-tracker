import React from "react";
import {
  DonutChart,
  BarList,
  Card,
  Title,
  Bold,
  Flex,
  Text,
} from "@tremor/react";

import { CssBaseline, Stack } from "@mui/material";

function Charts({ data, expense }) {
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  // add the amount of each expense to the categoriesData array
  const categoriesData = data.map((item) => {
    return {
      name: item.category,
      value: item.amount,
    };
  });

  // add the amount of same category expenses to the categoriesData array
  const categoriesData2 = categoriesData.reduce((acc, item) => {
    const index = acc.findIndex((i) => i.name === item.name);
    if (index === -1) {
      return [...acc, item];
    }
    acc[index].value += item.value;
    return acc;
  }, []);

  console.log(categoriesData2);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <Card maxWidth="max-w-lg">
          <Title>Individual Expenses</Title>
          <Flex marginTop="mt-4">
            <Text>
              <Bold>Name</Bold>
            </Text>
            <Text>
              <Bold>Amount ($)</Bold>
            </Text>
          </Flex>
          <BarList
            data={data.map((item) => {
              return {
                name: item.expenseName,
                value: item.amount,
              };
            })}
            marginTop="mt-2"
          />
        </Card>

        <DonutChart
          data={data}
          category="amount"
          dataKey="expenseName"
          colors={["violet", "indigo", "rose", "cyan", "amber"]}
          variant="donut"
          valueFormatter={valueFormatter}
          label={valueFormatter(expense)}
          showLabel={true}
          showTooltip={true}
          showAnimation={true}
          height="h-44"
          marginTop="mt-0"
        />
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row-reverse" }}
        spacing={{ xs: 1, sm: 2, md: 1 }}
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <Card maxWidth="max-w-lg">
          <Title>Expenses according to category</Title>
          <Flex marginTop="mt-4">
            <Text>
              <Bold>Category</Bold>
            </Text>
            <Text>
              <Bold>Amount ($)</Bold>
            </Text>
          </Flex>
          <BarList data={categoriesData2} marginTop="mt-2" />
        </Card>

        <DonutChart
          data={categoriesData2}
          category="value"
          dataKey="name"
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
      </Stack>
    </>
  );
}

export default Charts;
