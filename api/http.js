import axios from "axios";

const URL =
  "https://react-native-a2440-default-rtdb.asia-southeast1.firebasedatabase.app";

// Expense
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
      category: res.data[key].category,
      account: res.data[key].account,
      type: res.data[key].type,
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
  return axios.delete(`${URL}/expenses/${id}.json`);
};

// Income
// export const addIncomeApi = async (data) => {
//   const res = await axios.post(`${URL}/income.json`, data);
//   const id = res.data.name;
//   return id;
// };

// export const fetchIncomeApi = async () => {
//   const res = await axios.get(`${URL}/income.json`);
//   const incomes = [];
//   for (const key in res.data) {
//     const income = {
//       id: key,
//       name: res.data[key].name,
//     };
//     incomes.push(income);
//   }

//   return incomes;
// };

// export const deleteIncomeApi = async (id) => {
//   return axios.delete(`${URL}/income/${id}.json`);
// };

// export const updateIncomeApi = async (id, data) => {
//   // console.log("api", data);
//   return axios.put(`${URL}/income/${id}.json`, data);
// };

// Account
// export const addAccountApi = async (data) => {
//   const res = await axios.post(`${URL}/account.json`, data);
//   const id = res.data.name;
//   return id;
// };

// export const getAccountApi = async () => {
//   const res = await axios.get(`${URL}/account.json`);
//   const accounts = [];
//   for (const key in res.data) {
//     const account = {
//       id: key,
//       name: res.data[key].name,
//     };
//     accounts.push(account);
//   }

//   return accounts;
// };

// export const deleteAccountApi = async (id) => {
//   return axios.delete(`${URL}/account/${id}.json`);
// };

// export const updateAccountApi = async (id, data) => {
//   return axios.put(`${URL}/account/${id}.json`, data);
// };
