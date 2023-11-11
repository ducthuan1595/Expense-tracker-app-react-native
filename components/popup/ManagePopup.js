import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import HeaderPopup from "../ui/HeaderPopup";
import ListItem from "./ListItem";
import { CategoryStore } from "../../store/categoryContext";
import { AccountStore } from "../../store/accountContext";

const ManagePopup = ({ setIsPopup, name }) => {
  const { categories } = CategoryStore();
  const { accounts } = AccountStore();
  console.log(categories, name);
  let data = [];
  if (name === "Category") {
    data = categories;
  } else {
    data = accounts;
  }

  if (data.length) {
    return (
      <View style={styles.container}>
        <HeaderPopup
          name={name}
          icon={"create"}
          size={22}
          color={"white"}
          setIsPopup={setIsPopup}
        />
        <ListItem items={categories} />
      </View>
    );
  }
};

export default ManagePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "50%",
  },
});
