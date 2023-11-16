import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import { getFormatDate } from "../../util/date";
import { formatAmount } from "../../util/format";

const ExpenseItem = ({ desc, amount, date, id, account, category, type }) => {
  const navigation = useNavigation();
  const expenseHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };

  const typeColor = () => {
    if (type === "expense") {
      return { color: GlobalStyles.colors.error500, ...styles.amount };
    } else if (type === "income") {
      return { color: GlobalStyles.colors.income, ...styles.amount };
    } else {
      return { color: GlobalStyles.colors.gray500, ...styles.amount };
    }
  };

  return (
    <Pressable
      onPress={expenseHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={styles.category}>
            {type === "transfer" ? "Transfer" : category}
          </Text>
          <Text style={styles.textBase}>{getFormatDate(date)}</Text>
        </View>
        <View>
          <Text style={styles.account}>
            {type === "transfer" ? category + " ‹-› " + account : account}
          </Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={typeColor()}>{formatAmount(+amount)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  container: {},
  expenseItem: {
    padding: 12,
    marginVertical: 8,
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
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  category: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    color: "#fff",
  },
  account: {
    fontSize: 13,
    marginBottom: 4,
    fontWeight: "400",
    color: GlobalStyles.colors.accent500,
  },
  priceContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    fontWeight: "bold",
    minWidth: 50,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  desc: {
    color: GlobalStyles.colors.primary200,
    fontSize: 11,
  },
});
