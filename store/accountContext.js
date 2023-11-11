import { createContext, useContext, useReducer } from "react";

const Context = createContext({
  accounts: [],
  addAccount: (name) => {},
  removeAccount: (id) => {},
  editAccount: (name, id) => {},
  setAccount: (data) => {},
});

const reducer = (state, action) => {
  console.log("old data", state);
  switch (action.type) {
    case "SET":
      const data = action.payload.reverse();
      return data;
    case "ADD":
      const newData = [...state, action.payload];
      console.log("new data", newData);
      return newData;
    case "EDIT":
      const findIndexData = state.findIndex((e) => e.id === action.payload.id);
      const updateData = state[findIndexData];
      const updateItem = { ...updateData, ...action.payload.data };
      const cpState = [...state];
      cpState[findIndexData] = updateItem;
      return cpState;
    case "DELETE":
      return state.filter((c) => c.id !== action.payload);
    default:
      return state;
  }
};

const ProviderAccount = ({ children }) => {
  const [accounts, dispatch] = useReducer(reducer, []);

  const addAccount = (data) => {
    console.log("daa", data);
    dispatch({ type: "ADD", payload: data });
  };

  const editAccount = (data, id) => {
    dispatch({ type: "EDIT", payload: { id, data } });
  };

  const removeAccount = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const setAccount = (data) => {
    console.log({ data });
    dispatch({ type: "SET", payload: data });
  };

  const value = {
    addAccount,
    editAccount,
    removeAccount,
    setAccount,
    accounts,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const AccountStore = () => {
  return useContext(Context);
};

export default ProviderAccount;
