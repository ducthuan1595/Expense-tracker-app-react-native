import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

const TodoItem = ({item, index}) => {
  return (
    <View style={styles.content}>
      <View><Feather name="square" size={22} color="black" /></View>
      <Text style={styles.text}>{++index}. {item.name}</Text>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#f5c8c9',
    paddingTop: 9,
    paddingBottom: 4,
    gap: 8
  },
  text: {
    fontSize: 16,
    fontWeight: '500'
  }
})