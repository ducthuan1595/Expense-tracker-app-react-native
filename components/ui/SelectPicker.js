import { useState } from "react";
import {
  View,
  SectionList,
  StyleSheet,
  StatusBar,
  Text,
  Pressable,
} from "react-native";
import ChartPopup from "../popup/ChartPopup";
import { GlobalStyles } from "../../constants/styles";
import { ExpenseStore } from "../../store/context";

const DATA = ["weekly", "monthly", "yearly", "total"];

const SelectPicker = () => {
  const { valueSelectChart } = ExpenseStore();
  const [isPopup, setIsPopup] = useState(false);

  const showPopup = () => {
    setIsPopup(!isPopup);
  };

  return (
    <>
      <View>
        <Pressable
          onPress={showPopup}
          style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
          <Text style={styles.text}>{valueSelectChart}</Text>
        </Pressable>
      </View>
      {isPopup && <ChartPopup data={DATA} setIsPopup={setIsPopup} />}
    </>
  );
};

export default SelectPicker;

const styles = StyleSheet.create({
  container: {
    height: 26,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary50,
    marginRight: 24,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 12,
  },
  text: {
    color: "#fff",
    textTransform: "capitalize",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.6,
  },
});
