import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "../../constants/styles";
import { getEndOfWeek } from "../../util/date";

const HeaderTime = ({
  currTimeValue,
  valueSelect,
  currTimeLabel,
  setCurrTimeValue,
}) => {
  const checkInValid = () => {
    const date = new Date();
    if (valueSelect.toLowerCase() === "monthly") {
      if (date.getMonth() + 1 === currTimeValue) {
        return { opacity: 0 };
      }
    } else if (valueSelect.toLowerCase() === "yearly") {
      if (date.getFullYear() === currTimeValue) {
        return { opacity: 0 };
      } else {
        return { opacity: 1 };
      }
    } else if (valueSelect.toLowerCase() === "weekly") {
      // setCurrTimeValue(getEndOfWeek(date).getDate());
      return { opacity: 0 };
    }
  };

  return (
    <View style={styles.header}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() => {
          setCurrTimeValue((state) => {
            if ((valueSelect.toLowerCase() === "monthly" || valueSelect.toLowerCase() === "yearly") && state > 1 ) {
              return state - 1;
            } else {
              return state;
            }
          });
        }}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color="#fff"
          style={valueSelect.toLowerCase() === "weekly" && { opacity: 0 }}
        />
      </Pressable>
      <Text style={styles.time}>
        {currTimeLabel} - {currTimeValue}
      </Text>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={() =>
          setCurrTimeValue((state) => {
            if (valueSelect.toLowerCase() === "monthly") {
              if (state < new Date().getMonth() + 1) {
                return state + 1;
              } else {
                return state;
              }
            } else if (valueSelect.toLowerCase() === "yearly") {
              if (state < new Date().getFullYear()) {
                return state + 1;
              } else {
                return state;
              }
            } else {
              return state;
            }
          })
        }
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#fff"
          style={checkInValid()}
        />
      </Pressable>
    </View>
  );
};

export default HeaderTime;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  time: {
    color: GlobalStyles.colors.primary50,
    fontSize: 17,
    fontWeight: "300",
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.65,
  },
});
