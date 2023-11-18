import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import NavItem from "../ui/NavItem";

const NavExpense = ({ onPress, titleName }) => {
  return (
    <View style={styles.nav}>
      <NavItem
        onPress={onPress}
        style={styles.horizon}
        isNav={titleName === "expense"}
      >
        Expense
      </NavItem>
      <NavItem
        onPress={onPress}
        isNav={titleName === "income"}
        style={styles.horizon}
      >
        Income
      </NavItem>
      <NavItem
        onPress={onPress}
        isNav={titleName === "transfer"}
        style={styles.horizon}
      >
        Transfer
      </NavItem>
    </View>
  );
};

export default NavExpense;

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: GlobalStyles.colors.primary800,
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  horizon: {
    paddingHorizontal: 28,
    paddingVertical: 4,
  },
});
