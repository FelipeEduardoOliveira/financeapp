export const mockUsers = [
  {
    name: "Wallace Costa",
    email: "wallace@teste.com",
    password: "123456",
  },
  {
    name: "Felipe Oliveira",
    email: "felipe@teste.com",
    password: "123456",
  },
];
const now = new Date();
const y = now.getFullYear();
const m = now.getMonth();

const d = (day, monthOffset = 0) =>
  new Date(y, m + monthOffset, day).toISOString().split("T")[0];

export const mockExpenses = [
  {
    id: "1",
    name: "Aluguel",
    value: 2200,
    category: "Moradia",
    type: "fixed",
    date: d(1),
  },
  {
    id: "2",
    name: "Supermercado",
    value: 750,
    category: "Alimentação",
    type: "variable",
    date: d(3),
  },
  {
    id: "4",
    name: "Netflix",
    value: 59.9,
    category: "Lazer",
    type: "fixed",
    date: d(7),
  },
  {
    id: "8",
    name: "Internet",
    value: 109.9,
    category: "Moradia",
    type: "fixed",
    date: d(1),
  },
  {
    id: "10",
    name: "Água",
    value: 110,
    category: "Moradia",
    type: "fixed",
    date: d(5),
  },
  {
    id: "11",
    name: "Luz",
    value: 110,
    category: "Moradia",
    type: "fixed",
    date: d(5),
  },
  // Previous month
  {
    id: "12",
    name: "Aluguel",
    value: 2200,
    category: "Moradia",
    type: "fixed",
    date: d(1, -1),
  },
  {
    id: "13",
    name: "Supermercado",
    value: 750,
    category: "Alimentação",
    type: "variable",
    date: d(4, -1),
  },
  {
    id: "16",
    name: "Netflix",
    value: 39.9,
    category: "Lazer",
    type: "fixed",
    date: d(7, -1),
  },
];

export const mockIncomes = [
  { id: "1", name: "Salário", value: 6000, type: "fixed", date: d(5) },
  { id: "3", name: "Vale refeição", value: 750, type: "fixed", date: d(20) },
  // Previous month
  { id: "4", name: "Salário", value: 5000, type: "fixed", date: d(5, -1) },
  { id: "5", name: "Freelance", value: 350, type: "variable", date: d(18, -1) },
];

export const mockDebts = [
  {
    id: "1",
    name: "Cartão de Crédito",
    totalValue: 6000,
    paidValue: 800,
    date: d(10),
  },
  {
    id: "2",
    name: "Empréstimo Pessoal",
    totalValue: 10000,
    paidValue: 3200,
    date: d(15),
  },
  {
    id: "3",
    name: "Financiamento Carro",
    totalValue: 25000,
    paidValue: 12000,
    date: d(20),
  },
  {
    id: "3",
    name: "Financiamento Carro",
    totalValue: 50000,
    paidValue: 12000,
    date: d(20),
  },
];

export const CATEGORIES = [
  "Alimentação",
  "Moradia",
  "Transporte",
  "Saúde",
  "Lazer",
  "Educação",
  "Vestuário",
  "Outros",
];

export const CATEGORY_COLORS = {
  Alimentação: "#FF7043",
  Moradia: "#5C6BC0",
  Transporte: "#26A69A",
  Saúde: "#EC407A",
  Lazer: "#FFA726",
  Educação: "#42A5F5",
  Vestuário: "#AB47BC",
  Outros: "#78909C",
};
