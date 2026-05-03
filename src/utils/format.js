export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value ?? 0)

export const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export const getCurrentMonth = () => {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth() }
}

export const isCurrentMonth = (dateStr) => {
  if (!dateStr) return false
  const { year, month } = getCurrentMonth()
  const date = new Date(dateStr + 'T00:00:00')
  return date.getFullYear() === year && date.getMonth() === month
}

export const isPreviousMonth = (dateStr) => {
  if (!dateStr) return false
  const now = new Date()
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const date = new Date(dateStr + 'T00:00:00')
  return (
    date.getFullYear() === prevDate.getFullYear() &&
    date.getMonth() === prevDate.getMonth()
  )
}

export const calcPercentChange = (current, previous) => {
  if (!previous || previous === 0) return null
  return (((current - previous) / previous) * 100).toFixed(1)
}
