import React, { useEffect } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CategoryStore } from "../store/categoryContext";
import { deleteCategoryApi, fetchCategoryApi } from "../api/http";
import { GlobalStyles } from "../constants/styles";

const ManageItem = ({ name }) => {
  const { categories, setCategories, removeCategory } = CategoryStore();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await fetchCategoryApi();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
  }, [categories]);

  const handleDelete = async (id) => {
    try {
      await deleteCategoryApi(id);
      removeCategory(id);
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = (item) => {
    return (
      <View style={styles.listItem}>
        <View style={styles.left}>
          <Pressable
            onPress={handleDelete.bind(null, item.id)}
            style={({ pressed }) => pressed && styles.pressed}
          >
            <Ionicons name={"trash"} size={24} color={"red"} />
          </Pressable>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View>
          <Ionicons
            name="create"
            size={24}
            color={GlobalStyles.colors.gray700}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={name === "category" ? categories : []}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ManageItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  name: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  pressed: {
    opacity: 0.75,
  },
});
