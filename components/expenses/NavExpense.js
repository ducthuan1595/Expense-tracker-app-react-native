import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const NavExpense = ({ onPress, titleName }) => {
  return (
    <View style={styles.nav}>
      <Pressable
        onPress={() => onPress("expense")}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Text
          style={[
            styles.title,
            {
              color:
                titleName === "expense"
                  ? GlobalStyles.colors.error500
                  : GlobalStyles.colors.primary200,
            },
          ]}
        >
          Expense
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onPress("income")}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Text
          style={[
            styles.title,
            {
              color:
                titleName === "income"
                  ? GlobalStyles.colors.error500
                  : GlobalStyles.colors.primary200,
            },
          ]}
        >
          Income
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onPress("transfer")}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Text
          style={[
            styles.title,
            {
              color:
                titleName === "transfer"
                  ? GlobalStyles.colors.error500
                  : GlobalStyles.colors.primary200,
            },
          ]}
        >
          Transfer
        </Text>
      </Pressable>
    </View>
  );
};

export default NavExpense;

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary800,
    paddingHorizontal: 28,
    paddingTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 30,
    paddingVertical: 4,
    borderRadius: 8,
    color: GlobalStyles.colors.primary200,
    backgroundColor: GlobalStyles.colors.primary50,
    width: "100%",
  },
  pressed: {
    opacity: 0.6,
  },
});
