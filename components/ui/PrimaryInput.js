import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const PrimaryInput = ({
  label,
  textInputConfig,
  style,
  value,
  isLogin,
  showSoftInputOnFocus,
}) => {
  let inputStyes = [styles.input];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyes.push(styles.inputMultiline);
  }
  let labelText = { ...styles.label };
  if (isLogin) {
    labelText.color = GlobalStyles.colors.error500;
    labelText.fontSize = 14;
  }
  return (
    <>
      <View style={[styles.inputContainer, style]}>
        <Text style={labelText}>{label}</Text>
        <TextInput
          {...textInputConfig}
          style={inputStyes}
          value={value}
          showSoftInputOnFocus={showSoftInputOnFocus === "true" ? false : true}
        />
      </View>
    </>
  );
};

export default PrimaryInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    // flex: 1,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});
