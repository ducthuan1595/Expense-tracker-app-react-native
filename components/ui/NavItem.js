import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { formatAmount } from "../../util/format";

const NavItem = ({ children, onPress, isNav, style, total }) => {
  const textNav = {
    ...styles.title,
    ...style,
  };
  return (
    <Pressable
      onPress={() => onPress(children.toLowerCase())}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Text
        style={[
          textNav,
          {
            color: isNav
              ? GlobalStyles.colors.error500
              : GlobalStyles.colors.primary200,
          },
        ]}
      >
        {children} {total && formatAmount(total)}
      </Text>
    </Pressable>
  );
};

export default NavItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "400",
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    width: "100%",
  },
  pressed: {
    opacity: 0.6,
  },
});
