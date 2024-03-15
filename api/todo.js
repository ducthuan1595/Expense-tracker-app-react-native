import axios from "axios";

const URL =
  "https://react-native-a2440-default-rtdb.asia-southeast1.firebasedatabase.app";

export const addTodoListApi = async (todo) => {
  const res = await axios.post(`${URL}/todo.json`, todo);
  const id = res.data.name;
  return id;
};