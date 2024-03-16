import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseStore } from "../../store/context";

const ChartPopup = ({ data, setIsPopup }) => {
  const { setValueSelectChart } = ExpenseStore();
  return (
    <View style={styles.container}>
      {data.map((i) => (
        <Pressable
          style={({ pressed }) => [styles.text, pressed && styles.pressed]}
          key={i}
          onPress={() => {
            setValueSelectChart(i);
            setIsPopup(false);
          }}
        >
          <Text style={{ textTransform: "capitalize", width: '100%' }}>{i}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ChartPopup;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 0,
    top: 55,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingRight: 100,
    paddingLeft: 14,
    borderRadius: 6,
  },
  text: {
    width: '100%',
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.65,
  },
});
