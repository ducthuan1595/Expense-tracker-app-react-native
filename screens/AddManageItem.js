import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import PrimaryInput from "../components/ui/PrimaryInput";
import PrimaryButton from "../components/ui/PrimaryButton";
import {
  addAccountApi,
  addCategoryApi,
  updateAccountApi,
  updateCategoryApi,
} from "../api/http";
import { CategoryStore } from "../store/categoryContext";
import Loading from "../components/ui/Loading";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { AccountStore } from "../store/accountContext";

const AddManageItem = ({ route, navigation }) => {
  const storeContext = CategoryStore();
  const { addAccount, editAccount } = AccountStore();
  const [valueInput, setValueInput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const name = route.params.name;
  const id = route.params?.id;
  console.log({ name, id });
  useLayoutEffect(() => {
    const nameHeader = () => {
      if (name === "ManageAccount") {
        return "Add Account";
      } else if (name === "ChangeCategory") {
        return "Change Category";
      } else if (name === "ManageCategory") {
        return "Add Category";
      } else {
        return "Change Account";
      }
    };
    navigation.setOptions({
      title: nameHeader(),
    });
  }, [name]);

  const handleChange = async () => {
    if (valueInput.trim().length > 0 && name) {
      setIsLoading(true);
      if (name === "ManageAccount") {
        try {
          const id = await addAccountApi({ name: valueInput });
          addAccount({ name: valueInput, id });
          navigation.goBack();
        } catch (err) {
          setError("Could add account - Please try again");
          console.error(err);
        }
      } else if (name === "ManageCategory") {
        try {
          const id = await addCategoryApi({ name: valueInput });
          console.log({ id });
          storeContext.addCategory({ name: valueInput, id });
          navigation.goBack();
        } catch (err) {
          setError("Could add category - Please try again");
          console.error(err);
        }
      } else if (name === "ChangeCategory") {
        try {
          await updateCategoryApi(id, { name: valueInput });
          storeContext.editCategory({ name: valueInput }, id);
          navigation.goBack();
        } catch (err) {
          setError("Could update category - Please try again");
          console.error(err);
        }
      } else if (name === "ChangeAccount") {
        try {
          await updateAccountApi(id, { name: valueInput });
          editAccount({ name: valueInput }, id);
          navigation.goBack();
        } catch (err) {
          setError("Could update category - Please try again");
          console.error(err);
        }
      }
      setIsLoading(false);
    } else {
      Alert.alert("Input invalid", "Please check your input value!");
    }
  };

  const handleError = () => {
    setError(null);
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onPress={handleError} />;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View>
      <PrimaryInput
        style={styles.input}
        textInputConfig={{
          onChangeText: (e) => setValueInput(e),
        }}
      />
      <PrimaryButton style={styles.button} onPress={handleChange}>
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
