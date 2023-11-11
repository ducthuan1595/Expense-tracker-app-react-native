import React, { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { CategoryStore } from "../store/categoryContext";
import {
  deleteAccountApi,
  deleteCategoryApi,
  fetchCategoryApi,
  getAccountApi,
} from "../api/http";
import { GlobalStyles } from "../constants/styles";
import Loading from "../components/ui/Loading";
import { AccountStore } from "../store/accountContext";

const ManageItem = ({ name }) => {
  const storeCategory = CategoryStore();
  const { setAccount, accounts, removeAccount } = AccountStore();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  console.log({ name });

  const handleDelete = async (id) => {
    try {
      if (name === "category") {
        await deleteCategoryApi(id);
        storeCategory.removeCategory(id);
      } else {
        await deleteAccountApi(id);
        removeAccount(id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    if (name === "category") {
      navigation.navigate("AddManageItem", { name: "ChangeCategory", id: id });
    } else {
      navigation.navigate("AddManageItem", { name: "ChangeAccount", id: id });
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
          <Pressable onPress={() => handleEdit(item.id)}>
            <Ionicons
              name="create"
              size={24}
              color={GlobalStyles.colors.primary400}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  // console.log(storeCategory.categories);

  let data = [];
  if (name === "category") {
    if (storeCategory.categories.length) {
      data = storeCategory.categories;
    }
  } else {
    if (accounts.length) {
      data = accounts;
    }
  }
  if (isLoading || data.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
    // textTransform: "capitalize",
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
