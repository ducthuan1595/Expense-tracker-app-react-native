import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseStore } from "../../store/context";

const ListItem = ({ items, name, setIsPopup }) => {
  const { setValueInputCategory, setValueInputAccount } = ExpenseStore();
  const handleAddItem = (e) => {
    if (name === "category") {
      setValueInputCategory(e);
      setIsPopup(false);
    } else {
      setValueInputAccount(e);
      setIsPopup(false);
    }
  };

  const handleRender = (item) => {
    return (
      <View style={styles.container}>
        <Pressable
          onPress={handleAddItem.bind(null, item.name)}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.wrapItem}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={{ marginHorizontal: 24, marginBottom: 50 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => handleRender(item)}
        keyExtractor={(item) => item.id}
        // horizontal={true}
        numColumns={2}
      ></FlatList>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  container: {
    // flex: 1,
    width: "48%",
    margin: 4,
    // height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  name: {
    fontWeight: "400",
    fontSize: 16,
    color: GlobalStyles.colors.gray500,
  },
  wrapItem: {
    // flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 6,
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
  },
});
