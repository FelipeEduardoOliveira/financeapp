import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  mockExpenses,
  mockIncomes,
  mockDebts,
  mockUsers,
} from "../services/mockData";

const useStore = create(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          set({
            user: { name: user.name, email: user.email },
            isAuthenticated: true,
          });
          return true;
        }

        return false;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateProfile: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),

      // Theme
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Snackbar
      snackbar: { open: false, message: "", severity: "success" },
      showSnackbar: (message, severity = "success") =>
        set({ snackbar: { open: true, message, severity } }),
      closeSnackbar: () =>
        set((state) => ({ snackbar: { ...state.snackbar, open: false } })),

      // Expenses
      // expenses: mockExpenses,
      expenses: [],

      addExpense: (expense) => {
        const newExpense = { ...expense, id: Date.now().toString() };
        set((state) => ({ expenses: [...state.expenses, newExpense] }));
        get().showSnackbar("Gasto adicionado!");
      },

      updateExpense: (id, data) => {
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...data } : e,
          ),
        }));
        get().showSnackbar("Gasto atualizado!");
      },

      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        }));
        get().showSnackbar("Gasto removido!", "info");
      },

      // Incomes
      // incomes: mockIncomes,
      incomes: [],

      addIncome: (income) => {
        const newIncome = { ...income, id: Date.now().toString() };
        set((state) => ({ incomes: [...state.incomes, newIncome] }));
        get().showSnackbar("Renda adicionada!");
      },

      updateIncome: (id, data) => {
        set((state) => ({
          incomes: state.incomes.map((i) =>
            i.id === id ? { ...i, ...data } : i,
          ),
        }));
        get().showSnackbar("Renda atualizada!");
      },

      deleteIncome: (id) => {
        set((state) => ({ incomes: state.incomes.filter((i) => i.id !== id) }));
        get().showSnackbar("Renda removida!", "info");
      },

      // Debts
      // debts: mockDebts,
      debts: [],

      addDebt: (debt) => {
        const newDebt = { ...debt, id: Date.now().toString() };
        set((state) => ({ debts: [...state.debts, newDebt] }));
        get().showSnackbar("Dívida adicionada!");
      },

      updateDebt: (id, data) => {
        set((state) => ({
          debts: state.debts.map((d) => (d.id === id ? { ...d, ...data } : d)),
        }));
        get().showSnackbar("Dívida atualizada!");
      },

      deleteDebt: (id) => {
        set((state) => ({ debts: state.debts.filter((d) => d.id !== id) }));
        get().showSnackbar("Dívida removida!", "info");
      },
    }),
    {
      name: "financeapp-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        darkMode: state.darkMode,
        expenses: state.expenses,
        incomes: state.incomes,
        debts: state.debts,
      }),
    },
  ),
);

export default useStore;
