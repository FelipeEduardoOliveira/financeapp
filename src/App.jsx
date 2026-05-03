import { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import useStore from "./store/useStore";
import { lightTheme, darkTheme } from "./theme";
import BottomNav from "./components/layout/BottomNav";
import GlobalSnackbar from "./components/common/GlobalSnackbar";
import WelcomeModal from "./components/common/Welcomemodal";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import ExpenseForm from "./pages/ExpenseForm";
import Income from "./pages/Income";
import IncomeForm from "./pages/IncomeForm";
import Debts from "./pages/Debts";
import DebtForm from "./pages/DebtForm";
import Profile from "./pages/Profile";

const TERMS_KEY = "finapp-terms-accepted";

function PrivateRoute({ children }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppShell({ children }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}

export default function App() {
  const darkMode = useStore((s) => s.darkMode);
  const theme = darkMode ? darkTheme : lightTheme;

  const [modalOpen, setModalOpen] = useState(
    () => localStorage.getItem(TERMS_KEY) !== "true",
  );

  const handleAccept = () => {
    localStorage.setItem(TERMS_KEY, "true");
    setModalOpen(false);
  };

  const handleDecline = () => {
    setModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <WelcomeModal
        open={modalOpen}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />

      <HashRouter>
        <Routes>
          <Route
            path="/login"
            element={<Login onRequireTerms={() => setModalOpen(true)} />}
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <AppShell>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/expenses/add" element={<ExpenseForm />} />
                    <Route path="/expenses/edit/:id" element={<ExpenseForm />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/income/add" element={<IncomeForm />} />
                    <Route path="/income/edit/:id" element={<IncomeForm />} />
                    <Route path="/debts" element={<Debts />} />
                    <Route path="/debts/add" element={<DebtForm />} />
                    <Route path="/debts/edit/:id" element={<DebtForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </AppShell>
              </PrivateRoute>
            }
          />
        </Routes>
      </HashRouter>

      <GlobalSnackbar />
    </ThemeProvider>
  );
}