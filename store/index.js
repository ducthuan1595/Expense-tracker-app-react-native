import AuthContextProvider from "./authContext";
import ExpenseProvider from "./context";
import ProviderCategory from "./categoryContext";
import ProviderAccount from "./accountContext";
import ProviderCategoryIncome from "./incomeCategory";

export default function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ExpenseProvider>
        <ProviderAccount>
          <ProviderCategoryIncome>
            <ProviderCategory>{children}</ProviderCategory>
          </ProviderCategoryIncome>
        </ProviderAccount>
      </ExpenseProvider>
    </AuthContextProvider>
  );
}
