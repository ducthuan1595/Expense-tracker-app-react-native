import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PrimaryInput from "../components/ui/PrimaryInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import { addCategoryApi } from "../api/http";
import { CategoryStore } from "../store/categoryContext";

const AddManageItem = ({ route, navigation }) => {
  const { addCategory } = CategoryStore();
  const [valueInput, setValueInput] = useState("");
  const name = route.params?.name?.split("-")[0];
  console.log({ name });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name === "ManageAccount" ? "Add Account" : "Add Category",
    });
  }, [name]);

  const handleAdd = async () => {
    if (valueInput.trim().length > 0 && name) {
      if (name === "ManageAccount") {
      } else {
        try {
          const id = await addCategoryApi({ name: valueInput });
          addCategory({ name: valueInput, id });
          navigation.goBack();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
  return (
    <View>
      <PrimaryInput
        style={styles.input}
        textInputConfig={{
          onChangeText: (e) => setValueInput(e),
        }}
      />
      <PrimaryButton style={styles.button} onPress={handleAdd}>
        Save
      </PrimaryButton>
    </View>
  );
};

export default AddManageItem;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
    paddingTop: 16,
  },
  input: {
    marginHorizontal: 20,
  },
});
