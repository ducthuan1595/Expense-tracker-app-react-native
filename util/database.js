import * as SQLite from "expo-sqlite";

const categoryExpenseDB = SQLite.openDatabase("categories_expense.db");
const categoryIncomeDB = SQLite.openDatabase("categories_income.db");
const accountDB = SQLite.openDatabase("accounts.db");
const todoDB = SQLite.openDatabase("todoList.db");

// Expense
const categoriesExpenseInit = () => {
  const data = [
    "Food",
    "Health",
    "Apparel",
    "Transportation",
    "Accommodation",
    "Event",
    "Element",
    "Self-development",
    "Entertainment",
    "Book",
    "Other",
  ];
  const result = new Promise((resolve, reject) => {
    categoryExpenseDB.transaction((tx) => {
      tx.executeSql(
        `INSERT OR IGNORE INTO categories_expense (name) VALUES (?), (?), (?), (?), (?), (?), (?), (?), (?), (?), (?)`,
        [...data],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return result;
};

export const initCategoryExpense = () => {
  const promise = new Promise((resolve, reject) => {
    categoryExpenseDB.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories_expense (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT UNIQUE NOT NULL
        )`,
        [],
        () => {
          categoriesExpenseInit()
            .then((_, result) => {
              resolve();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

export const fetchCategoriesExpenseDB = () => {
  const promise = new Promise((resolve, reject) => {
    categoryExpenseDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories_expense ORDER BY id DESC",
        [],
        (_, result) => {
          const categories = [];
          for (const db of result.rows._array) {
            categories.push({
              name: db.name,
              id: db.id,
            });
          }
          // console.log("categoryDB", categories);
          resolve(categories);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const addExpenseCategory = (name) => {
  const promise = new Promise((resolve, reject) => {
    categoryExpenseDB.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO categories_expense (
        name
      ) VALUES (?)`,
        [name],
        (_, res) => resolve(res.insertId),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const updateExpenseCategory = (name, id) => {
  const promise = new Promise((resolve, reject) => {
    categoryExpenseDB.transaction((tx) => {
      tx.executeSql(
        `UPDATE categories_expense SET name = (?) WHERE id = (?)`,
        [name, id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteExpenseCategory = (id) => {
  const promise = new Promise((resolve, reject) => {
    categoryExpenseDB.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM categories_expense WHERE id = (?)`,
        [id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

// Income
const initIncomeCategory = () => {
  const data = ["Salary", "Bonus", "OT", "Interest", "Other"];
  const result = new Promise((resolve, reject) => {
    categoryIncomeDB.transaction((tx) => {
      tx.executeSql(
        `INSERT OR IGNORE INTO categories_income (name) VALUES (?), (?), (?), (?), (?)`,
        [...data],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return result;
};

export const initCategoryIncomeDB = () => {
  const promise = new Promise((resolve, reject) => {
    categoryIncomeDB.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories_income (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT UNIQUE NOT NULL
        )`,
        [],
        () => {
          initIncomeCategory()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

export const fetchCategoryIncomeDB = () => {
  const promise = new Promise((resolve, reject) => {
    categoryIncomeDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM categories_income ORDER BY id DESC",
        [],
        (_, result) => {
          const accounts = [];
          for (const db of result.rows._array) {
            accounts.push({
              name: db.name,
              id: db.id,
            });
          }
          // console.log("category-income", accounts);
          resolve(accounts);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteCategoryIncomeDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    categoryIncomeDB.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM categories_income WHERE id = (?)`,
        [id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const addIncomeCategory = (name) => {
  const promise = new Promise((resolve, reject) => {
    categoryIncomeDB.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO categories_income (
        name
      ) VALUES (?)`,
        [name],
        (_, res) => resolve(res.insertId),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const updateIncomeCategory = (name, id) => {
  const promise = new Promise((resolve, reject) => {
    categoryIncomeDB.transaction((tx) => {
      tx.executeSql(
        `UPDATE categories_income SET name = (?) WHERE id = (?)`,
        [name, id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

// Account
const initAccount = () => {
  const data = ["Cash", "Accounts", "Card", "Other"];
  const result = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        `INSERT OR IGNORE INTO accounts (name) VALUES (?), (?), (?), (?)`,
        [...data],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return result;
};

export const initAccountDB = () => {
  const promise = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT UNIQUE NOT NULL
        )`,
        [],
        () => {
          initAccount()
            .then(() => {
              resolve();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

export const fetchAccountDB = () => {
  const promise = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM accounts ORDER BY id DESC",
        [],
        (_, result) => {
          const accounts = [];
          for (const db of result.rows._array) {
            accounts.push({
              name: db.name,
              id: db.id,
            });
          }
          // console.log("category-income", accounts);
          resolve(accounts);
        },
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const deleteAccountDB = (id) => {
  const promise = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM accounts WHERE id = (?)`,
        [id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const addAccountDB = (name) => {
  const promise = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        `
      INSERT INTO accounts (
        name
      ) VALUES (?)`,
        [name],
        (_, res) => resolve(res.insertId),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

export const updateAccountDB = (name, id) => {
  const promise = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        `UPDATE accounts SET name = (?) WHERE id = (?)`,
        [name, id],
        (_, res) => resolve(res),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

// Delete table
export const deleteTableExpense = () => {
  const promise = new Promise((resolve, reject) => {
    accountDB.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS categories_expense",
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};
export const deleteTableIncome = () => {
  const promise = new Promise((resolve, reject) => {
    todoDB.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS todoList",
        [],
        () => resolve(),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};


// TODO LIST
export const initTodo = () => {
  const promise = new Promise((resolve, reject) => {
    todoDB.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS todoList (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT UNIQUE NOT NULL,
          isDone INTEGER DEFAULT 0
        )`,
        [],
        (_, res) => {
          resolve(res);
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

export const addTodo = (name) => {
  const promise = new Promise((resolve, reject) => {
    todoDB.transaction((tx) => {
      tx.executeSql(`
        INSERT INTO todoList (name) VALUES (?)`,
        [name],
        (_, res) => resolve(res.insertId),
        (_, err) => reject(err)
      )
    })
  });
  return promise
}

export const updateTodo = (name, isDone, id) => {
  const promise = new Promise((resolve, reject) => {
    todoDB.transaction((tx) => {
      tx.executeSql(`UPDATE todoList SET name = (?), isDone = (?) WHERE id = (?)`,
        [name, isDone, id],
        (_, res) => resolve(res),
        (_, err) => reject()
      )
    })
  });
  return promise;
}

export const destroyTodo = (id) => {
  const promise = new Promise((resolve, reject) => {
    todoDB.transaction((tx) => {
      tx.executeSql(`DELETE FROM todoList WHERE id = (?)`,
        [id],
        (_, res) => resolve(),
        (_, err) => reject()
      )
    })
  });
  return promise;
}

export const getTodoList = () => {
  const promise = new Promise((resolve, reject) => {
    todoDB.transaction((tx) => {
      tx.executeSql('SELECT * FROM todoList ORDER BY id DESC',
      [],
      (_, result) => {
        const data = [];
        for (const db of result.rows._array) {
          data.push({
            name: db.name,
            id: db.id,
            isDone: db.isDone
          });
        }
        // console.log("category-income", data);
        resolve(data);
      },
      (_, err) => reject(err)      
      )
    })
  });
  return promise;
}