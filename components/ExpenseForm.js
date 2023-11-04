import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import PrimaryInput from "./ui/PrimaryInput";
import { GlobalStyles } from "../constants/styles";

const ExpenseForm = ({ setExpenses, expenses, setIsPopup, setNameHeader }) => {
  const handleAmount = (e) => {
    setIsPopup(false);
    setExpenses((state) => {
      return {
        ...state,
        amount: +e,
      };
    });
  };
  const handleDate = (e) => {
    setIsPopup(false);
    setExpenses((state) => {
      return {
        ...state,
        date: new Date(e),
      };
    });
  };
  const handleDesc = (e) => {
    setIsPopup(false);
    setExpenses((state) => {
      return {
        ...state,
        desc: e,
      };
    });
  };
  const handleSelectCategory = (name) => {
    setNameHeader(name);
    setIsPopup(true);
  };
  const handleSelectAccount = (name) => {
    setNameHeader(name);

    setIsPopup(true);
  };

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
          <PrimaryInput
            label={"Amount"}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: handleAmount,
              onPressIn: () => setIsPopup(false),
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
        <Pressable onPress={handleSelectCategory.bind(null, "Category")}>
          <Text style={styles.text}>Category</Text>
          <View style={[styles.selectInput, styles.marginBottom]}></View>
        </Pressable>
        <Pressable onPress={handleSelectAccount.bind(null, "Account")}>
          <Text style={styles.text}>Account</Text>
          <View style={styles.selectInput}></View>
        </Pressable>
        <PrimaryInput
          label={"Description"}
          textInputConfig={{
            onChangeText: handleDesc,
            multiline: true,
            autoCorrect: false,
            autoCapitalize: "none",
            onPressIn: () => setIsPopup(false),

            // numberOfLines: 4,
          }}
          value={expenses.desc}
        />
      </View>
    </>
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
  text: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  selectInput: {
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
  },
  marginBottom: {
    marginBottom: 8,
  },
});
