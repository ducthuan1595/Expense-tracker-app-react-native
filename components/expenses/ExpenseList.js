import React from "react";
import { View, FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ items }) => {
  const renderItem = (item) => {
    return <ExpenseItem {...item} />;
  };
  return (
    <View style={{ marginBottom: 50 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ExpenseList;
