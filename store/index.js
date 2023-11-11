import AuthContextProvider from "./authContext";
import ExpenseProvider from "./context";
import ProviderCategory from "./categoryContext";
import ProviderAccount from "./accountContext";

export default function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ExpenseProvider>
        <ProviderAccount>
          <ProviderCategory>{children}</ProviderCategory>
        </ProviderAccount>
      </ExpenseProvider>
    </AuthContextProvider>
  );
}
