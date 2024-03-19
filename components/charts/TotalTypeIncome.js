import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { formatAmount } from "../../util/format";
import { AccountStore } from '../../store/accountContext'

const TotalTypeIncome = ({data}) => {
  const {accounts} = AccountStore();
  const [totalType, setTotalType] = useState(accounts);


  console.log({data});
  useEffect(() => {
    const updateState = totalType.map((item, index) => {
      const amount = handleFilter(data, item.name);
      return {...item, amount}
    })
    setTotalType(updateState);
  }, [accounts])

  const handleFilter = (arr, type) => {
    let amount = 0;
    arr.filter(i => {
      if(i.account == type) {
        amount += +i.amount;
      }
    });
    return amount;
  }

  return (
    <View style={styles.container}>
      {totalType.map((item, index) => (
        <View key={index} style={[styles.item, index % 2 == 0 ? styles.even : styles.odd]}>
        <Text>{item.name}:</Text>
        <Text>$ {formatAmount(item.amount)}</Text>
      </View>
      ))}
    </View>
  );
};

export default TotalTypeIncome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 8
  },
  odd: {
    backgroundColor: '#dce5ee',
  },
  even: {
    backgroundColor: '#ccced2',
  },
})