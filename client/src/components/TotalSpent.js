import { Card, Flex, Metric, BadgeDelta, Text } from "@tremor/react";

export default ({ amount }) => (
  <Card maxWidth="max-w-sm">
    <Flex justifyContent="justify-between" alignItems="items-center">
      <Text>Total Spent</Text>
      {/* <BadgeDelta
        deltaType="moderateIncrease"
        text="+12.3%"
        isIncreasePositive={true}
        size="xs"
      /> */}
    </Flex>
    <Metric>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      }).format(amount)}
    </Metric>
  </Card>
);
