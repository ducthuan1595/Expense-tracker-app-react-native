import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import HeaderPopup from "../ui/HeaderPopup";

const ManagePopup = () => {
  return (
    <View style={styles.container}>
      <HeaderPopup name="Category" icon={"add"} size={24} color={"white"} />
      <FlatList>List</FlatList>
    </View>
  );
};

export default ManagePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "50%",
  },
});
