import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import HeaderPopup from "../ui/HeaderPopup";
import ListItem from "./ListItem";

const ManagePopup = ({ setIsPopup, name }) => {
  return (
    <View style={styles.container}>
      <HeaderPopup
        name={name}
        icon={"create"}
        size={22}
        color={"white"}
        setIsPopup={setIsPopup}
      />
      <FlatList>
        <ListItem items={[]} />
      </FlatList>
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
