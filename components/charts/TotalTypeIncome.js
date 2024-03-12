import { View, Text } from "react-native";

const TotalTypeIncome = ({data}) => {
  console.log({data});
  const handleFilter = (arr) => {
    return arr.filter(i => i.account)
  }
  return (
    <View>
      <Text>type income</Text>
    </View>
  );
};

export default TotalTypeIncome;