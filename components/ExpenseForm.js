import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PrimaryInput from "./ui/PrimaryInput";

const ExpenseForm = ({ setExpenses, expenses }) => {
  const handleAmount = (e) => {
    setExpenses((state) => {
      return {
        ...state,
        amount: +e,
      };
    });
  };
  const handleDate = (e) => {
    setExpenses((state) => {
      return {
        ...state,
        date: new Date(e),
      };
    });
  };
  const handleDesc = (e) => {
    setExpenses((state) => {
      return {
        ...state,
        desc: e,
      };
    });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <PrimaryInput
          label={"Amount"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleAmount,
          }}
          style={styles.rowInput}
          value={expenses.amount.toString()}
        />
        <PrimaryInput
          label={"Date"}
          textInputConfig={{
            // keyboardType: "decimal-pad",
            onChangeText: handleDate,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
          }}
          style={styles.rowInput}
          value={expenses.date}
        />
      </View>
      <PrimaryInput
        label={"Description"}
        textInputConfig={{
          onChangeText: handleDesc,
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "none",
          // numberOfLines: 4,
        }}
        value={expenses.desc}
      />
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
});
