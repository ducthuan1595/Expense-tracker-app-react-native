import { createContext, useContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../data/expenses";

// console.log(DUMMY_EXPENSES);

const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ desc, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { desc, amount, date }) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [...state, { ...action.payload, id }];
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
  const [expenses, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  const addExpense = (expense) => {
    dispatch({ type: "ADD", payload: expense });
  };
  const updateExpense = (id, expense) => {
    dispatch({ type: "UPDATE", payload: { id, data: expense } });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const values = {
    addExpense,
    updateExpense,
    deleteExpense,
    expenses,
  };

  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export const ExpenseStore = () => {
  return useContext(ExpenseContext);
};

export default ExpenseProvider;
