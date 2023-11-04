import React from "react";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";

const ListItem = ({ items }) => {
  const handleRender = ({ item }) => {
    return (
      <Pressable
        onPress={handleAddItem}
        style={({ pressed }) => pressed && styles.pressed}
      ></Pressable>
    );
  };
  return (
    <FlatList
      data={items}
      renderItem={handleRender}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
});
