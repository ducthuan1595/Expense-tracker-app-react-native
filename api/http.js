import axios from "axios";

const URL =
  "https://react-native-a2440-default-rtdb.asia-southeast1.firebasedatabase.app";

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
  return axios.delete(`${URL}/expenses/${id}.json`);
};

// Category
export const addCategoryApi = async (category) => {
  const res = await axios.post(`${URL}/category.json`, category);
  const id = res.data.name;
  return id;
};

export const fetchCategoryApi = async () => {
  const res = await axios.get(`${URL}/category.json`);
  const categories = [];
  for (const key in res.data) {
    const category = {
      id: key,
      name: res.data[key].name,
    };
    categories.push(category);
  }

  return categories;
};

export const deleteCategoryApi = async (id) => {
  return axios.delete(`${URL}/category/${id}.json`);
};

export const updateCategoryApi = async (id, category) => {
  console.log("api", category);
  return axios.put(`${URL}/category/${id}.json`, category);
};

// Account
export const addAccountApi = async (data) => {
  const res = await axios.post(`${URL}/account.json`, data);
  const id = res.data.name;
  return id;
};

export const getAccountApi = async () => {
  const res = await axios.get(`${URL}/account.json`);
  const accounts = [];
  for (const key in res.data) {
    const account = {
      id: key,
      name: res.data[key].name,
    };
    accounts.push(account);
  }

  return categories;
};

export const deleteAccountApi = async (id) => {
  return axios.delete(`${URL}/account/${id}.json`);
};

export const updateAccountApi = async (id, data) => {
  return axios.put(`${URL}/account/${id}.json`, data);
};
