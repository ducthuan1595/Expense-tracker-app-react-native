import AuthContextProvider from "./authContext";
import ExpenseProvider from "./context";

export default function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ExpenseProvider>{children}</ExpenseProvider>
    </AuthContextProvider>
  );
}
