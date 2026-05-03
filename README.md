# 💰 FinanceApp

Aplicativo mobile-first de controle financeiro pessoal. Sem backend — dados persistidos no `localStorage` via Zustand.

---

## 🚀 Como rodar

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

**Login demo:** `ana@email.com` / `123456`

---

## 🗂️ Estrutura do Projeto

```
financeapp/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Ponto de entrada
    ├── App.jsx               # Router + ThemeProvider + AuthGuard
    ├── theme/
    │   └── index.js          # Temas claro e escuro (MUI)
    ├── store/
    │   └── useStore.js       # Estado global com Zustand + persistência
    ├── services/
    │   └── mockData.js       # Dados mockados iniciais + constantes
    ├── hooks/
    │   └── useFinanceData.js # Hook calculando totais, gráficos e transações
    ├── utils/
    │   └── format.js         # formatCurrency, formatDate, helpers de mês
    ├── components/
    │   ├── layout/
    │   │   ├── BottomNav.jsx  # Navegação inferior
    │   │   └── PageWrapper.jsx
    │   └── common/
    │       ├── GlobalSnackbar.jsx
    │       ├── ConfirmDialog.jsx
    │       └── EmptyState.jsx
    └── pages/
        ├── Login.jsx
        ├── Dashboard.jsx
        ├── Expenses.jsx
        ├── ExpenseForm.jsx   # Adicionar/Editar gasto
        ├── Income.jsx
        ├── IncomeForm.jsx    # Adicionar/Editar renda
        ├── Debts.jsx
        ├── DebtForm.jsx      # Adicionar/Editar dívida
        └── Profile.jsx
```

---

## 🧱 Stack

| Biblioteca | Uso |
|---|---|
| React 18 + Vite | Framework + bundler |
| MUI v6 | Componentes UI |
| React Router v6 | Navegação SPA |
| Zustand v5 | Estado global + localStorage |
| Recharts | Gráfico de pizza no Dashboard |

---

## ✨ Funcionalidades

- **Login** com validação + credencial demo
- **Dashboard** com saldo, totais, variação % e gráfico de categorias
- **Gastos** com filtro por tipo e categoria, CRUD completo
- **Rendas** com CRUD completo
- **Dívidas** com barra de progresso de pagamento
- **Perfil** com edição de nome e toggle de tema claro/escuro
- **Persistência** automática no localStorage
- **Feedback visual** com Snackbar e diálogos de confirmação
