import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getTodoList } from "../util/database";
import { TodoListStore } from "../store/todo/todoList";
import IconButton from "../components/ui/IconButton";
import TodoItem from "../components/todoList/TodoItem";

const TodoList = ({navigation}) => {
  const { setTodoList } = TodoListStore();
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getTodoList().then(res => {
      setTodo(res)
      setTodoList(res)
    }).catch(err => console.error(err))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: calendar()
    });
  }, [])

  const calendar = () => {
    return (
      <IconButton
        icon="calendar"
        size={24}
        color={'white'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    )
  }

  console.log('todolist', todo);

  return (
    <View style={styles.container}>
      <View style={styles.todoList}>
        <View style={styles.title}>
          <Text>Today</Text>

        </View>
        <FlatList data={todo} renderItem={({item, index}) => <TodoItem item={item} index={index} />} />
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    display: 'flex'
  },
  todoList: {
    display: 'flex',
    gap: 9,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    elevation: 19,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
  }
})
