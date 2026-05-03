import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import useStore from '../store/useStore'
import { useFinanceData } from '../hooks/useFinanceData'
import { formatCurrency, formatDate } from '../utils/format'
import PageWrapper from '../components/layout/PageWrapper'

function SummaryCard({ title, value, change, icon, color }) {
  const isPositive = parseFloat(change) >= 0
  return (
    <Card>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="h6" fontWeight={700} color={color} sx={{ mt: 0.5 }}>
              {formatCurrency(value)}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `${color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color,
            }}
          >
            {icon}
          </Box>
        </Box>
        {change !== null && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            {isPositive ? (
              <TrendingUpRoundedIcon sx={{ fontSize: 14, color: isPositive ? 'success.main' : 'error.main' }} />
            ) : (
              <TrendingDownRoundedIcon sx={{ fontSize: 14, color: 'success.main' }} />
            )}
            <Typography variant="caption" color={isPositive ? 'error.main' : 'success.main'} fontWeight={600}>
              {Math.abs(change)}% vs mês anterior
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

function TransactionItem({ item }) {
  const isExpense = item.kind === 'expense'
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {item.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {item.category || 'Renda'} · {formatDate(item.date)}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        fontWeight={700}
        color={isExpense ? 'error.main' : 'success.main'}
      >
        {isExpense ? '- ' : '+ '}
        {formatCurrency(item.value)}
      </Typography>
    </Box>
  )
}

export default function Dashboard() {
  const user = useStore((s) => s.user)
  const {
    balance,
    totalExpenses,
    totalIncomes,
    expenseChange,
    incomeChange,
    chartData,
    recentTransactions,
  } = useFinanceData()

  return (
    <PageWrapper>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="text.secondary">
          Olá, {user?.name?.split(' ')[0]} 👋
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          Resumo do Mês
        </Typography>
      </Box>

      {/* Balance hero */}
      <Card
        sx={{
          background: 'linear-gradient(135deg, #5C6BC0 0%, #26A69A 100%)',
          color: '#fff',
          mb: 2,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AccountBalanceWalletRoundedIcon sx={{ fontSize: 20, opacity: 0.8 }} />
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Saldo atual
            </Typography>
          </Box>
          <Typography variant="h3" fontWeight={700}>
            {formatCurrency(balance)}
          </Typography>
          <Chip
            label={balance >= 0 ? 'Positivo' : 'Negativo'}
            size="small"
            sx={{
              mt: 1,
              background: balance >= 0 ? 'rgba(255,255,255,0.25)' : 'rgba(239,83,80,0.4)',
              color: '#fff',
              fontWeight: 600,
            }}
          />
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 2 }}>
        <SummaryCard
          title="Total Gastos"
          value={totalExpenses}
          change={expenseChange}
          icon={<TrendingDownRoundedIcon fontSize="small" />}
          color="#EF5350"
        />
        <SummaryCard
          title="Total Renda"
          value={totalIncomes}
          change={incomeChange}
          icon={<TrendingUpRoundedIcon fontSize="small" />}
          color="#66BB6A"
        />
      </Box>

      {/* Chart */}
      {chartData.length > 0 && (
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2" fontWeight={600} mb={1}>
              Gastos por Categoria
            </Typography>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => <span style={{ fontSize: 11 }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Recent Transactions */}
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            Transações Recentes
          </Typography>
          {recentTransactions.length === 0 ? (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
              Nenhuma transação este mês
            </Typography>
          ) : (
            recentTransactions.map((item, i) => (
              <Box key={item.id + item.kind}>
                <TransactionItem item={item} />
                {i < recentTransactions.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  )
}
