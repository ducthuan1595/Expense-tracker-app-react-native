import { createContext, useContext, useReducer } from "react";

const Context = createContext(
  {
    todoList: [],
    addTodoList: (name) => {},
    updateTodoList: (name, id) => {},
    deleteTodoList: (id) => {},
    setTodoList: () => {}
  }
)

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD':
      return [...state, action.payload.todo]
    case 'DELETE':
      return state.filter(i => i.id !== action.payload.id)
    case 'SET':
      return state = action.payload.data
    case 'UPDATE':
      const newState = [...state];
      const index = newState.findIndex(i => i.id === action.payload.id);
      const update = newState[index];
      const newTodo = {...update, ...action.payload.name};
      newState[index] = newTodo;
      return newState;
    default:
      return state;
  }
}

const ProviderTodo = ({children}) => {
  const [todoList, dispatch] = useReducer(reducer, []);

  const addTodoList = (todo) => {
    dispatch({type: 'ADD', payload: {todo}})
  }
  const updateTodoList = (name, id) => {
    dispatch({type:'UPDATE', payload: {name, id}})
  }
  const deleteTodoList = (id) => {
    dispatch({type: 'DELETE', payload: {id}})
  }
  const setTodoList = (data) => {
    dispatch({type: 'SET', payload: {data}})
  }

  const values = {
    addTodoList,
    updateTodoList,
    deleteTodoList,
    setTodoList,
    todoList
  };

  return <Context.Provider value={values}>{children}</Context.Provider>
}

export const TodoListStore = () => {
  return useContext(Context);
}

export default ProviderTodo;
