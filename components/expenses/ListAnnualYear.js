import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { formatAmount } from "../../util/format";
import { GlobalStyles } from "../../constants/styles";

const ListAnnualYear = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item["year"]}
        renderItem={({ item }) => {
          const value = item.value;
          let income, expense;
          for (let i = 0; i < value.length; i++) {
            if (value[i].type === "income") {
              income = value[i].total;
            } else {
              expense = value[i].total;
            }
          }
          return (
            <View style={styles.item}>
              <Text style={{ color: "#fff" }}>{item["year"]}</Text>
              <Text style={styles.income}>
                {income ? "$ " + formatAmount(income) : 0}
              </Text>
              <Text style={styles.expense}>
                {expense ? "$ " + formatAmount(expense) : 0}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ListAnnualYear;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 20,
  },
  item: {
    padding: 12,
    marginVertical: 4,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  expense: {
    color: GlobalStyles.colors.error500,
  },
  income: {
    color: GlobalStyles.colors.income,
  },
});
