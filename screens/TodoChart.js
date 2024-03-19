import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";

import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
} from "victory-native";
import { ExpenseStore } from "../store/context";
import { colorsArray } from "../constants/color";
import { GlobalStyles } from "../constants/styles";
import HeaderTime from "../components/ui/HeaderTime";

import { getFollowMonth, getFollowWeek, getFollowYear } from "../util/date";
import { getStartOfWeek } from "../util/date";
import { getTodoListApi } from "../api/todo";

function TodoChart({ navigation }) {
  const { valueSelectChart, setValueSelectChart } = ExpenseStore();
  const [data, setData] = useState([]);

  const [currTimeLabel, setCurrTimeLabel] = useState("m");
  const [currTimeValue, setCurrTimeValue] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const fetchTodoListApi = async() => {
    const res = await getTodoListApi();
    setTodoList(res)
  }

  useEffect(() => {
    fetchTodoListApi();
  }, [])

  useEffect(() => {
    const day = new Date();
    const date = day.getDate();
    const month = day.getMonth() + 1;
    const year = day.getFullYear();
    setCurrTimeValue((state) => {
      if (valueSelectChart.toLowerCase() === "weekly") {
        setCurrTimeLabel(`from ${getStartOfWeek(day).getDate()}`);
        return date;
      } else if (valueSelectChart.toLowerCase() === "monthly") {
        setCurrTimeLabel("m");
        return month;
      } else {
        setCurrTimeLabel(`y`);
        return year;
      }
    });
  }, [valueSelectChart]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <HeaderTime
            valueSelect={valueSelectChart}
            currTimeLabel={currTimeLabel}
            currTimeValue={currTimeValue}
            setCurrTimeValue={setCurrTimeValue}
          />
        );
      },
    });
  }, [valueSelectChart, currTimeLabel, currTimeValue, setCurrTimeValue]);

  const loadData = () => {
    const today = new Date();
    if (valueSelectChart.toLowerCase() === "weekly") {
      const data = getFollowWeek(today, todoList);
      return data;
    } else if (valueSelectChart.toLowerCase() === "monthly") {
      const data = getFollowMonth(currTimeValue, todoList);
      return data;
    } else if (valueSelectChart.toLowerCase() === "yearly") {
      const data = getFollowYear(currTimeValue, todoList);
      return data;
    }
    return todoList;
  };

  useEffect(() => {
    const todo = loadData();
  
    let num = 0;
    const newArr = [];
    for (let value of todo) {
      console.log(valueSelectChart);
      let time;
      if(valueSelectChart.toLowerCase() === 'monthly') {
        time = new Date(value.date).getDate();
      } else if(valueSelectChart.toLowerCase() === 'yearly') {
        time = new Date(value.date).getMonth() + 1;
      } else {
        time = new Date(value.date).getDate();
      }
      newArr.push({
        x: +time,
        y: +value.percent,
        // color: colorsArray[num],
      });
      num++;
    }
    setData(newArr);
    
  }, [valueSelectChart, currTimeValue, currTimeLabel, setCurrTimeValue, todoList, setTodoList]);

  return (
    <ScrollView>
      {/* <View style={styles.chart}> */}
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 5 }}
      >
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          labels={({ datum }) => `y: ${datum.y}`}
          data={data}
          animate={{
            duration: 2000,
          }}
        />
      </VictoryChart>
      {/* </View> */}
    </ScrollView>
  );
}

export default TodoChart;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#f5fcff",
  },
  // chart: {
  //   flex: 1,
  //   // justifyContent: "center",
  //   alignItems: "center",
  //   width: "100%",
  //   height: 380,
  // },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  horizon: {
    paddingHorizontal: 40,
    paddingVertical: 4,
  },
  infoText: {
    color: GlobalStyles.colors.error500,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
