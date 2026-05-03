import useStore from '../store/useStore'
import { isCurrentMonth, isPreviousMonth, calcPercentChange } from '../utils/format'
import { CATEGORY_COLORS } from '../services/mockData'

export const useFinanceData = () => {
  const expenses = useStore((s) => s.expenses)
  const incomes = useStore((s) => s.incomes)

  const currentExpenses = expenses.filter((e) => isCurrentMonth(e.date))
  const prevExpenses = expenses.filter((e) => isPreviousMonth(e.date))
  const currentIncomes = incomes.filter((i) => isCurrentMonth(i.date))
  const prevIncomes = incomes.filter((i) => isPreviousMonth(i.date))

  const totalExpenses = currentExpenses.reduce((s, e) => s + Number(e.value), 0)
  const totalPrevExpenses = prevExpenses.reduce((s, e) => s + Number(e.value), 0)
  const totalIncomes = currentIncomes.reduce((s, i) => s + Number(i.value), 0)
  const totalPrevIncomes = prevIncomes.reduce((s, i) => s + Number(i.value), 0)
  const balance = totalIncomes - totalExpenses

  const expenseChange = calcPercentChange(totalExpenses, totalPrevExpenses)
  const incomeChange = calcPercentChange(totalIncomes, totalPrevIncomes)

  // Group by category
  const byCategory = currentExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.value)
    return acc
  }, {})

  const chartData = Object.entries(byCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2)),
    fill: CATEGORY_COLORS[name] || '#78909C',
  }))

  const recentTransactions = [
    ...currentExpenses.map((e) => ({ ...e, kind: 'expense' })),
    ...currentIncomes.map((i) => ({ ...i, kind: 'income' })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8)

  return {
    balance,
    totalExpenses,
    totalIncomes,
    totalPrevExpenses,
    totalPrevIncomes,
    expenseChange,
    incomeChange,
    chartData,
    recentTransactions,
  }
}
