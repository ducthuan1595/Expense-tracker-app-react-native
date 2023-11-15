import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import ExpenseOutput from "../components/expenses/ExpenseOutput";
import { ExpenseStore } from "../store/context";
import { getDateMinuteDays } from "../util/date";
import { fetchExpenses } from "../api/http";
import Loading from "../components/ui/Loading";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import { CategoryStore } from "../store/categoryContext";
import { AccountStore } from "../store/accountContext";
import {
  fetchAccountDB,
  fetchCategoriesExpenseDB,
  fetchCategoryIncomeDB,
} from "../util/database";
import { CategoryIncomeStore } from "../store/incomeCategory";

const RecentExpense = () => {
  const { expenses, setExpense } = ExpenseStore();
  const storeCategory = CategoryStore();
  const { setAccount } = AccountStore();
  const { setCategoriesIncome } = CategoryIncomeStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExpenses();
        setExpense(data);
      } catch (err) {
        setError("Could not fetch expenses!");
      }
      setIsLoading(false);
    };
    getExpenses();
  }, []);

  const fetCategory = async () => {
    try {
      const category = await fetchCategoriesExpenseDB();
      storeCategory.setCategories(category);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchIncome = async () => {
    try {
      const income = await fetchCategoryIncomeDB();
      setCategoriesIncome(income);
    } catch (err) {
      console.error(err);
    }
  };
  const fetAccount = async () => {
    try {
      const account = await fetchAccountDB();
      setAccount(account);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetCategory();
    fetAccount();
    fetchIncome();
  }, []);

  const handleError = () => {
    setError(null);
  };

  if (error) {
    return <ErrorOverlay message={error} onPress={handleError} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const recentExpense = expenses.filter((e) => {
    const today = new Date();
    const date7DaysAgo = getDateMinuteDays(today, 7);
    return e.date > date7DaysAgo;
  });

  return (
    <ExpenseOutput
      fallBack={"No expense register recent"}
      expenses={recentExpense}
      periodName={"Last 7 Days"}
    />
  );
};

export default RecentExpense;
