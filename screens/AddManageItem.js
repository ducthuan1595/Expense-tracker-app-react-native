import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

const AddManageItem = ({ route, navigation }) => {
  console.log({ route });
  // useLayoutEffect(() => {
  //   const router = route.params?.
  //   navigation.setOptions({
  //     title: 'title'
  //   })
  // }, [navigation])
  return (
    <View>
      <Text>AddManageItem</Text>
    </View>
  );
};

export default AddManageItem;
