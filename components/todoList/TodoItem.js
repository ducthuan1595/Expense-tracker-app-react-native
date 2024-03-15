import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';

const TodoItem = ({item, index, onPress, style, checkList}) => {
  const isStyle = checkList.find(i => i.id === item.id);
  return (
    <View style={styles.content}>
      <Pressable onPress={onPress} style={isStyle && style }><Feather name="square" size={22} color="tomato" /></Pressable>
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
    paddingTop: 4,
    paddingBottom: 5,
    gap: 8,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    fontWeight: '500'
  }
})