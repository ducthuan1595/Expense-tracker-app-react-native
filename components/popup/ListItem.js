import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";

const ListItem = ({ items }) => {
  const handleAddItem = () => {};
  const handleRender = (item) => {
    return (
      <Pressable
        onPress={handleAddItem}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View>
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => handleRender(item)}
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
