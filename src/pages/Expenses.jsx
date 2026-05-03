import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import useStore from '../store/useStore'
import { formatCurrency, formatDate, isCurrentMonth } from '../utils/format'
import { CATEGORIES } from '../services/mockData'
import PageWrapper from '../components/layout/PageWrapper'
import EmptyState from '../components/common/EmptyState'
import ConfirmDialog from '../components/common/ConfirmDialog'

export default function Expenses() {
  const navigate = useNavigate()
  const expenses = useStore((s) => s.expenses)
  const deleteExpense = useStore((s) => s.deleteExpense)
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)

  const filtered = expenses
    .filter((e) => isCurrentMonth(e.date))
    .filter((e) => typeFilter === 'all' || e.type === typeFilter)
    .filter((e) => categoryFilter === 'all' || e.category === categoryFilter)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <PageWrapper>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Gastos
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel>Tipo</InputLabel>
          <Select value={typeFilter} label="Tipo" onChange={(e) => setTypeFilter(e.target.value)}>
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="fixed">Fixo</MenuItem>
            <MenuItem value="variable">Variável</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" fullWidth>
          <InputLabel>Categoria</InputLabel>
          <Select value={categoryFilter} label="Categoria" onChange={(e) => setCategoryFilter(e.target.value)}>
            <MenuItem value="all">Todas</MenuItem>
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState message="Nenhum gasto encontrado" />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filtered.map((expense) => (
            <Card key={expense.id}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={600} noWrap>
                      {expense.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip label={expense.category} size="small" variant="outlined" sx={{ fontSize: 11, height: 20 }} />
                      <Chip
                        label={expense.type === 'fixed' ? 'Fixo' : 'Variável'}
                        size="small"
                        color={expense.type === 'fixed' ? 'primary' : 'secondary'}
                        sx={{ fontSize: 11, height: 20 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">{formatDate(expense.date)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" fontWeight={700} color="error.main">
                      {formatCurrency(expense.value)}
                    </Typography>
                    <IconButton size="small" onClick={() => navigate(`/expenses/edit/${expense.id}`)}>
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setDeleteId(expense.id)}>
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        onClick={() => navigate('/expenses/add')}
      >
        <AddRoundedIcon />
      </Fab>

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir Gasto"
        message="Tem certeza que deseja excluir este gasto?"
        onConfirm={() => { deleteExpense(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </PageWrapper>
  )
}
