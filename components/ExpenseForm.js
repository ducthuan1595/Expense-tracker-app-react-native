import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
// import DateTimePicker from '@react-native-community/datetimepicker';
import {Calendar, LocaleConfig} from 'react-native-calendars';

import PrimaryInput from "./ui/PrimaryInput";
import { GlobalStyles } from "../constants/styles";
import { formatInput, formatAmount } from "../util/format";

const ExpenseForm = ({
  setExpenses,
  expenses,
  setIsPopup,
  setNameHeader,
  titleName,
}) => {
  
  const [selected, setSelected] = useState(expenses.date);
  const [isShowDate, setIsShowDate] = useState(false);

  useEffect(() => {
    setSelected(expenses.date)
  }, [expenses.date])
  
  const handleAmount = (e) => {
    setIsPopup(false);
    setExpenses((state) => {
      return {
        ...state,
        amount: formatInput(e)
      };
    });
  };
  const handleDate = () => {
    setIsPopup(false);
    setIsShowDate(true);
  };

  const handleDesc = (e) => {
    setIsPopup(false);
    setExpenses((state) => {
      return {
        ...state,
        desc: e,
      };
    });
  };
  const handleSelectCategory = (name) => {
    setNameHeader(name);
    setIsPopup(true);
  };
  const handleSelectAccount = (name) => {
    setNameHeader(name);

    setIsPopup(true);
  };

  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your {titleName}</Text>
        <View style={styles.inputRow}>
          <PrimaryInput
            label={"Amount"}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: handleAmount,
              onPressIn: () => setIsPopup(false),
            }}
            style={[styles.rowInput, styles.minWidth]}
            value={formatAmount(expenses.amount)}
          />
          <Pressable onPress={handleDate}>
            <PrimaryInput
              label={"Date"}
              style={[styles.rowInput, styles.minWidth]}
              value={selected}
              editable={false}
            />
          </Pressable>
        </View>
        {isShowDate && 
          <View style={styles.popupDate}>
            <Calendar
              onDayPress={day => {
                setIsShowDate(false)
                setSelected(day.dateString);
                setExpenses((state) => {
                  return {
                    ...state,
                    date: day.dateString,
                  };
                });
              }}
              markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
              }}
            />
          </View>
        }
        <Pressable onPress={handleSelectCategory.bind(null, "category")}>
          <PrimaryInput
            label={titleName === "transfer" ? "From" : "Category"}
            style={styles.rowInput}
            value={expenses.category}
            editable={false}
          />
        </Pressable>
        <Pressable onPress={handleSelectAccount.bind(null, "account")}>
          <PrimaryInput
            label={titleName === "transfer" ? "To" : "Account"}
            style={styles.rowInput}
            value={expenses.account}
            editable={false}
          />
        </Pressable>
        <PrimaryInput
          label={"Description"}
          textInputConfig={{
            onChangeText: handleDesc,
            multiline: true,
            autoCorrect: false,
            autoCapitalize: "none",
            onPressIn: () => setIsPopup(false),

            // numberOfLines: 4,
          }}
          value={expenses.desc}
        />
      </View>
    </>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  minWidth: {
    minWidth: '48%'
  },
  form: {
    position: 'relative',
    marginTop: 40,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 20,
    textTransform: "capitalize",
  },
  text: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  selectInput: {
    padding: 20,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 8,
  },
  marginBottom: {
    marginBottom: 8,
  },
  popupDate: {
    position: 'absolute',
    top: '35%',
    right: 0,
    left: 0,
    elevation: 100,
    zIndex: 100
  }
});
