import axios from "axios";

const URL =
  "https://react-native-a2440-default-rtdb.asia-southeast1.firebasedatabase@app";

export const storeExpense = async (expense) => {
  const res = await axios.post(`${URL}/expenses.json`, expense);
  const id = res.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const res = await axios.get(`${URL}/expenses.json`);
  const expenses = [];
  for (const key in res.data) {
    const expense = {
      id: key,
      amount: +res.data[key].amount,
      date: new Date(res.data[key].date),
      desc: res.data[key].desc,
    };
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpenses = async (id, expense) => {
  const res = await axios.put(`${URL}/expenses/${id}.json`, expense);
  return res;
};

export const deleteExpenses = async (id) => {
  return axios.delete(`${URL}/${id}.json`);
};
