import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ desc, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { desc, amount, date }) => {},
  setExpense: (expense) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      const data = action.payload.reverse();
      return data;
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((e) => e.id !== action.payload);
    case "UPDATE":
      const findExpenseIndex = state.findIndex(
        (e) => e.id === action.payload.id
      );
      const updateExpense = state[findExpenseIndex];
      const updateItem = { ...updateExpense, ...action.payload.data };
      const updateExpenses = [...state];
      updateExpenses[findExpenseIndex] = updateItem;

      return updateExpenses;
    default:
      return state;
  }
};

const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expense) => {
    dispatch({ type: "ADD", payload: expense });
  };
  const updateExpense = (id, expense) => {
    dispatch({ type: "UPDATE", payload: { id, data: expense } });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const setExpense = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const values = {
    addExpense,
    updateExpense,
    deleteExpense,
    expenses,
    setExpense,
  };

  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export const ExpenseStore = () => {
  return useContext(ExpenseContext);
};

export default ExpenseProvider;
