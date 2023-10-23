import React from "react";
import { Text } from "react-native";
import ExpenseOutput from "../components/expenses/ExpenseOutput";
import { ExpenseStore } from "../store/context";

function AllExpense() {
  const { expenses } = ExpenseStore();

  return (
    <ExpenseOutput
      fallBack={"No found expenses"}
      expenses={expenses}
      periodName={"Total"}
    />
  );
}

export default AllExpense;
