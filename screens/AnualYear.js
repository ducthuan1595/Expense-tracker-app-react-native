import React from "react";
import { Text, View } from "react-native";
import ExpenseSummary from "../components/expenses/ExpenseSummary";
import { ExpenseStore } from "../store/context";

const AnualYear = () => {
  const { expenses } = ExpenseStore();
  return (
    <View>
      <ExpenseSummary expenses={expenses} />
    </View>
  );
};

export default AnualYear;
