import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, ScrollView } from "react-native";

import {
  VictoryPie,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryScatter,
} from "victory-native";
import Svg, { Path } from "react-native-svg";
import { ExpenseStore } from "../store/context";
import NavItem from "../components/ui/NavItem";
import { colorsArray } from "../constants/color";
import ListChar from "../components/expenses/ListChar";
import { formatAmount } from "../util/format";

function ExpenseChart() {
  const { expenses } = ExpenseStore();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState({
    income: 0,
    expense: 0,
  });
  const [title, setTitle] = useState("expense");

  const calcTotal = (data) => {
    return data.reduce((a, b) => a + +b.amount, 0);
  };

  useEffect(() => {
    const expenseArr = expenses.filter((e) => e.type === "expense");
    const incomeArr = expenses.filter((e) => e.type === "income");
    setTotal({
      expense: calcTotal(expenseArr),
      income: calcTotal(incomeArr),
    });

    const objectChart = (data) => {
      const object = {};
      for (const item of data) {
        object[item.category] =
          (object[item.category] || 0) + Number(item.amount);
      }
      return object;
    };
    let num = 0;

    // console.log({ newExpense });
    if (title === "expense") {
      const total = calcTotal(expenseArr);
      const newExpense = objectChart(expenseArr);
      // console.log(newExpense);
      const newArr = [];
      for (let key in newExpense) {
        const percent = ((newExpense[key] / total) * 100).toFixed(2);
        newArr.push({
          x: key,
          y: +percent,
          color: colorsArray[num],
          total: newExpense[key],
        });
        num++;
      }
      newArr.sort((a, b) => b.y - a.y);
      setData(newArr);
    } else {
      const total = calcTotal(incomeArr);
      const newExpense = objectChart(incomeArr);
      const newArr = [];
      for (let key in newExpense) {
        const percent = ((newExpense[key] / total) * 100).toFixed(2);
        newArr.push({
          x: key,
          y: Number(percent),
          color: colorsArray[num],
          total: newExpense[key],
        });
        num++;
      }
      newArr.sort((a, b) => b.y - a.y);
      setData(newArr);
    }
  }, [expenses, title]);

  const getColor = () => {
    return data.map((a) => a.color);
  };

  return (
    <ScrollView>
      {/* <Svg width={20} height={20} viewBox="0 0 20 20">
        <Path d="M16.993 6.667H3.227l6.883 6.883 6.883-6.883z" fill="#000" />
      </Svg> */}
      {/* <VictoryScatter> */}
      <View style={styles.nav}>
        <NavItem
          onPress={(e) => setTitle(e)}
          isNav={title === "expense"}
          style={styles.horizon}
          total={total.expense}
        >
          Expense
        </NavItem>
        <NavItem
          onPress={(e) => setTitle(e)}
          isNav={title === "income"}
          style={styles.horizon}
          total={total.income}
        >
          Income
        </NavItem>
      </View>
      <View style={styles.chart}>
        <VictoryPie
          data={data}
          x={"x"}
          y={"y"}
          width={340}
          height={340}
          colorScale={getColor()}
          animate={{
            duration: 2000,
          }}
          theme={VictoryTheme.material}
          sortKey="y"
          sortOrder="descending"
          labels={({ datum }) => [`${datum.x}`, `${datum.y}%`]}
          labelComponent={
            <VictoryLabel
              style={[{ fill: "#000", fontSize: 8, textAlign: "center" }]}
              lineHeight={[1, 1]}
            />
          }
        />
        {/* </VictoryScatter> */}
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => <ListChar item={item} />}
        />
      </View>
    </ScrollView>
  );
}

export default ExpenseChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#f5fcff",
  },
  chart: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 380,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  horizon: {
    paddingHorizontal: 40,
    paddingVertical: 4,
  },
});
