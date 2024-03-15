import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import {Calendar, Agenda, CalendarList} from 'react-native-calendars';

import Confetti from "../components/todoList/confetti/Confetti";

import { getTodoList } from "../util/database";
import { TodoListStore } from "../store/todo/todoList";
import { addTodoListApi } from "../api/todo";
import { AuthStore } from "../store/authContext";
import IconButton from "../components/ui/IconButton";
import TodoItem from "../components/todoList/TodoItem";
import { GlobalStyles } from "../constants/styles";
import { checkFormat } from "../util/format";
import AgendaScreen from "../components/todoList/Agenda";

const TodoList = ({navigation}) => {
  const { setTodoList, todoList } = TodoListStore();
  const {user} = AuthStore();

  const [checkList, setCheckList] = useState([]);
  const [clock, setClock] = useState('');
  const [isCalendar, setIsCalendar] = useState(false);

  useEffect(() => {
    getTodoList().then(res => {
      setTodoList(res)
    }).catch(err => console.error(err))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: calendar()
    });
  }, [])

  useEffect(() => {
    const createClock = () => {
      const currDate = new Date();
      const day = currDate.getDate();
      const month = currDate.getMonth() + 1;
      const hour = currDate.getHours();
      const minute = currDate.getMinutes();
      const second = currDate.getSeconds();

      if(second == 0) {
        console.log('send api');
        const data = {
          todoList: checkList,
          user: user.email,
          percent: Math.ceil((checkList.length / todoList.length) * 100)
        }
        // addTodoListApi(data).then(res => {
        //   console.log(res);
        // }).catch(err => console.log(err))
      }
    
      const format = `${checkFormat(month)}/${checkFormat(day)} - ${checkFormat(hour)}:${checkFormat(minute)}:${checkFormat(second)}`
      setClock(format)
    }
    
    const intervalId = setInterval(createClock, 1000);

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const calendar = () => {
    return (
      <IconButton
        icon="calendar"
        size={24}
        color={'white'}
        onPress={() => {
          setIsCalendar((state) => !state);
        }}
      />
    )
  };

  const onCheck = (todo) => {
    const isExist = checkList.findIndex(i => i.id === todo.id);
    if(isExist !== -1) {
      const newTodo = checkList.filter(i => i.id !== todo.id)
      setCheckList(newTodo)
    }else {
      setCheckList((state) => [...state, todo])
    }
  }

  const styleColor = {
    backgroundColor: '#76f06d',
    borderRadius: 8,
  }

  if(isCalendar) {
    return (
      <View>
        <CalendarList />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.todoList}>
        <View style={styles.position}><AntDesign name="link" size={50} color="brown" /></View>
        <View style={[styles.title, styles.flexRow]}>
          <View>
            <Text>Today</Text>
            <Text>{clock}</Text>
          </View>
          <View style={[styles.flexRow]}>
            <Text>{checkList.length}/{todoList.length}</Text>
            <Text style={{color: '#12590d96'}}>completed</Text>
          </View>
        </View>
        <FlatList data={todoList} renderItem={({item, index}) => <TodoItem item={item} index={index} onPress={() => onCheck(item)} style={styleColor} checkList={checkList} />} />
      </View>

      {/* {todo.length == checkList.length && <Confetti />} */}
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginLeft: 20
    // backgroundColor: GlobalStyles.colors.primary500,
  },
  todoList: {
    display: 'flex',
    position: 'relative',
    gap: 9,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 10,
    backgroundColor: '#f9e6c9',
    borderRadius: 16,
    elevation: 19,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  position: {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5
  }
})
