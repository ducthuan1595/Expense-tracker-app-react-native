import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { TodoListStore } from "../../store/todo/todoList";
import PrimaryInput from "../ui/PrimaryInput";
import PrimaryButton from "../ui/PrimaryButton";
import { addTodo, updateTodo } from "../../util/database";

const AddTodo = ({todo}) => {
  const navigation = useNavigation();
  const { addTodoList, updateTodoList } = TodoListStore();
  const [inputValue, setInputValue] = useState('');

  const onSubmit = async () => {
    if(todo) {
      await updateTodo(inputValue);
      updateTodoList({name: inputValue, id: todo.id, isDone: todo.isDone})
    }else {
      const id =  await addTodo(inputValue)
      addTodoList({name: inputValue, id})
    }
    navigation.goBack();
  }

  const style = {
    paddingHorizontal: 20
  }
  return (
    <View>
      <PrimaryInput label={todo ? 'Edit todo' : "Add todo"} style={style} value={todo?.name} isLogin={true} textInputConfig={{onChangeText: (e) => setInputValue(e)}} />
      <View style={{marginTop: 10}}>
        <PrimaryButton style={style} onPress={onSubmit}>Add</PrimaryButton>
      </View>
    </View>
  );
};

export default AddTodo;