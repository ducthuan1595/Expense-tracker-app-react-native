import { createContext, useContext, useReducer } from "react";

const Context = createContext({
  categories: [],
  addCategory: (name) => {},
  removeCategory: (categoryId) => {},
  editCategory: (name, categoryId) => {},
  setCategories: (categories) => {},
});

const reducer = (state, action) => {
  console.log("old data", state);
  switch (action.type) {
    case "SET":
      const data = action.payload.reverse();
      console.log("new category", data);
      return data;
    case "ADD":
      const newData = [...state, action.payload];
      console.log("new data", newData);
      return newData;
    case "EDIT":
      const findIndexCategory = state.findIndex(
        (e) => e.id === action.payload.id
      );
      const updateCategory = state[findIndexCategory];
      const updateItem = { ...updateCategory, ...action.payload.data };
      const cpState = [...state];
      cpState[findIndexCategory] = updateItem;
      return cpState;
    case "DELETE":
      return state.filter((c) => c.id !== action.payload);
    default:
      return state;
  }
};

const ProviderCategory = ({ children }) => {
  const [categories, dispatch] = useReducer(reducer, []);

  const addCategory = (data) => {
    console.log("daa", data);
    dispatch({ type: "ADD", payload: data });
  };

  const editCategory = (data, id) => {
    dispatch({ type: "EDIT", payload: { id, data } });
  };

  const removeCategory = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const setCategories = (data) => {
    console.log("set", data);
    dispatch({ type: "SET", payload: data });
  };

  const value = {
    addCategory,
    editCategory,
    removeCategory,
    setCategories,
    categories,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const CategoryStore = () => {
  return useContext(Context);
};

export default ProviderCategory;
