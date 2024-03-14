import AuthContextProvider from "./authContext";
import ExpenseProvider from "./context";
import ProviderCategory from "./categoryContext";
import ProviderAccount from "./accountContext";
import ProviderCategoryIncome from "./incomeCategory";
import ProviderTodo from "./todo/todoList";

export default function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ExpenseProvider>
        <ProviderAccount>
          <ProviderCategoryIncome>
            <ProviderTodo>
              <ProviderCategory>{children}</ProviderCategory>
            </ProviderTodo>
          </ProviderCategoryIncome>
        </ProviderAccount>
      </ExpenseProvider>
    </AuthContextProvider>
  );
}
