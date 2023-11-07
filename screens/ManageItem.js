import React from "react";
import { Text, View } from "react-native";

const ManageItem = ({ name }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default ManageItem;
