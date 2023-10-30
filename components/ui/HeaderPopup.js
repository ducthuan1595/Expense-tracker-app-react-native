import React from "react";
import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderPopup = ({ name, icon, size, color }) => {
  return (
    <View style={styles.headers}>
      <Text style={styles.name}>{name}</Text>
      <ScrollView>
        <Pressable>
          <Ionicons name={icon} size={size} color={color} />
          <Text>x</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default HeaderPopup;
const styles = StyleSheet.create({
  headers: {
    height: 40,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-between",
  },
  name: {
    color: "white",
    textAlign: "center",
  },
});
