import AuthContextProvider from "./authContext";
import ExpenseProvider from "./context";
import ProviderCategory from "./categoryContext";

export default function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ExpenseProvider>
        <ProviderCategory>{children}</ProviderCategory>
      </ExpenseProvider>
    </AuthContextProvider>
  );
}
