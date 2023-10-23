import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import PrimaryButton from "../components/ui/PrimaryButton";
import { ExpenseStore } from "../store/context";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const { addExpense, deleteExpense, updateExpense } = ExpenseStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDelete = () => {
    deleteExpense(expenseId);
    navigation.goBack();
  };
  const cancelhandler = () => {
    navigation.goBack();
  };
  const handleConfirm = () => {
    if (isEditing) {
      updateExpense(expenseId, {
        desc: "A mouse",
        amount: 11.99,
        date: new Date("2023-10-9"),
      });
    } else {
      addExpense({
        desc: "A house",
        amount: 11.99,
        date: new Date("2023-10-9"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <PrimaryButton
          style={styles.button}
          mode={"flat"}
          onPress={cancelhandler}
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton style={styles.button} onPress={handleConfirm}>
          {isEditing ? "Update" : "Add"}
        </PrimaryButton>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon={"trash"}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary500,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
