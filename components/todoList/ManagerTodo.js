import { useEffect, useState } from 'react';
import { FlatList, ScrollView, View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

import { GlobalStyles } from '../../constants/styles';
import { bgColors, colorsArray } from '../../constants/color';
import AddTodo from './AddTodo';
import { TodoListStore } from '../../store/todo/todoList';
import { destroyTodo } from '../../util/database';

const ManagerTodo = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [todo, setTodo] = useState();
  const { todoList, deleteTodoList } = TodoListStore();

  const editInput = (item) => {
    setTodo(item);
    setIsPopup(true);
  }

  const updateList = () => {
    setIsPopup(true);
  }

  const deleteTodo = async(id) => {
    await destroyTodo(id);
    deleteTodoList(id);
  }

  if(isPopup) {
    return <AddTodo todo={todo} />
  }

  const renderItem = (item, index) => {
    const length = bgColors.length;
    let id = index;
    if(id >= (length * 2)) {
      id = id - (length * 2)
    }
    else if(id >= length) {
      id -= length;
    }
   
    const styleItem = {
      ...styles.item,
      backgroundColor: (bgColors[id])
    };

    return (
      <View style={styleItem}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
          <Pressable onPress={() => editInput(item)} style={({pressed}) => pressed && styles.pressed}>
            <View><EvilIcons name="pencil" size={24} color={colorsArray[index]} /></View>
          </Pressable>
          <Text style={styles.text}>{item.name}</Text>
        </View>
        <Pressable onPress={() => deleteTodo(item.id)} style={({pressed}) => pressed && styles.pressed}>
          <View><EvilIcons name="trash" size={24} color='red' /></View>
        </Pressable>
      </View>
    )
  }

  return (
    <View 
      style={styles.container}
    >
      <View style={styles.title}>
        <Text style={{color: '#fff', fontSize: 18}}>Todo List</Text>
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={updateList}>
          <Ionicons name="add" size={30} color="black" />
        </Pressable>
      </View>
      <FlatList 
        data={todoList}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <View style={styles.bottom}>
      </View>
    </View>
  );
};

export default ManagerTodo;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    backgroundColor: GlobalStyles.colors.income,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 20,
    fontStyle: 'italic'
  },
  bottom: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.income,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10
  }
})