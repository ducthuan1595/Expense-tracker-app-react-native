import React from "react";
import { Text } from "react-native";
import ExpenseOutput from "../components/expenses/ExpenseOutput";
import { ExpenseStore } from "../store/context";
import { getDateMinuteDays } from "../util/date";

const RecentExpense = () => {
  const { expenses } = ExpenseStore();

  const recentExpense = expenses.filter((e) => {
    const today = new Date();
    const date7DaysAgo = getDateMinuteDays(today, 7);
    return e.date > date7DaysAgo;
  });

  return (
    <ExpenseOutput
      fallBack={"No expense register recent"}
      expenses={recentExpense}
      periodName={"Last 7 Days"}
    />
  );
};

export default RecentExpense;
