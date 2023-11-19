import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderPopup = ({ name, icon, size, color, setIsPopup }) => {
  const navigation = useNavigation();
  const handleEdit = () => {
    navigation.navigate("ManageItem");
  };
  return (
    <View style={styles.headers}>
      <Text style={styles.name}>{name}</Text>
      <View>
        <View style={styles.headersRow}>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={handleEdit}
          >
            <Ionicons name={icon} size={size} color={color} />
          </Pressable>
          <Pressable
            style={({ pressed }) => pressed && styles.pressed}
            onPress={() => setIsPopup((state) => !state)}
          >
            <Ionicons name={"close"} size={20} color={color} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default HeaderPopup;
const styles = StyleSheet.create({
  headers: {
    flexDirection: "row",
    height: 40,
    backgroundColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headersRow: {
    flex: 1,
    justifyContent: "flex-end",
    textAlign: "right",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginRight: 30,
  },
  name: {
    color: "white",
    textAlign: "left",
    flex: 1,
    marginLeft: 30,
    fontSize: 15,
    textTransform: "capitalize",
  },
  button: {
    color: "white",
  },
  pressed: {
    opacity: 0.75,
    // backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
