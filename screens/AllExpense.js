import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import Svg, { Path } from "react-native-svg";

function AllExpense() {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  return (
    <View style={styles.container}>
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Path d="M16.993 6.667H3.227l6.883 6.883 6.883-6.883z" fill="#000" />
      </Svg>
      <VictoryChart>
        <VictoryBar data={data} x={"quarter"} y={"earnings"} />
      </VictoryChart>
    </View>
  );
}

export default AllExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
