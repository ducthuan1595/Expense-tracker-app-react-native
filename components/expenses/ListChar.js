import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { formatAmount } from "../../util/format";

const ListChar = ({ item }) => {
  const colorPercent = {
    ...styles.percent,
    backgroundColor: item.color,
  };
  return (
    <View style={styles.item}>
      <View style={styles.wrap}>
        <Text style={colorPercent}>{item.y}%</Text>
        <Text>{item.x}</Text>
      </View>
      <Text>$ {formatAmount(item.total)}</Text>
    </View>
  );
};

export default ListChar;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  percent: {
    width: 60,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    textAlign: "center",
  },
});
