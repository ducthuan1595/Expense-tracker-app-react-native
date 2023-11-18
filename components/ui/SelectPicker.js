import { useState } from "react";
import { View, SectionList, StyleSheet, StatusBar, Text } from "react-native";

const DATA = [
  {
    title: "Month",
    data: ["weekly", "Month", "Year"],
  },
];

const SelectPicker = () => {
  const [selectedValue, setSelectedValue] = useState("");
  return <View></View>;
};

export default SelectPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
