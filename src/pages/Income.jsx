import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import useStore from '../store/useStore'
import { formatCurrency, formatDate, isCurrentMonth } from '../utils/format'
import PageWrapper from '../components/layout/PageWrapper'
import EmptyState from '../components/common/EmptyState'
import ConfirmDialog from '../components/common/ConfirmDialog'

export default function Income() {
  const navigate = useNavigate()
  const incomes = useStore((s) => s.incomes)
  const deleteIncome = useStore((s) => s.deleteIncome)
  const [deleteId, setDeleteId] = useState(null)

  const currentIncomes = incomes
    .filter((i) => isCurrentMonth(i.date))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const total = currentIncomes.reduce((s, i) => s + Number(i.value), 0)

  return (
    <PageWrapper>
      <Typography variant="h5" fontWeight={700} mb={1}>
        Rendas
      </Typography>

      <Card sx={{ background: 'linear-gradient(135deg, #66BB6A, #26A69A)', color: '#fff', mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>Total do mês</Typography>
          <Typography variant="h5" fontWeight={700}>{formatCurrency(total)}</Typography>
        </CardContent>
      </Card>

      {currentIncomes.length === 0 ? (
        <EmptyState message="Nenhuma renda este mês" />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {currentIncomes.map((income) => (
            <Card key={income.id}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" fontWeight={600} noWrap>{income.name}</Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                      <Chip
                        label={income.type === 'fixed' ? 'Fixo' : 'Variável'}
                        size="small"
                        color={income.type === 'fixed' ? 'primary' : 'secondary'}
                        sx={{ fontSize: 11, height: 20 }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">{formatDate(income.date)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body1" fontWeight={700} color="success.main">
                      {formatCurrency(income.value)}
                    </Typography>
                    <IconButton size="small" onClick={() => navigate(`/income/edit/${income.id}`)}>
                      <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => setDeleteId(income.id)}>
                      <DeleteRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Fab color="secondary" sx={{ position: 'fixed', bottom: 80, right: 16 }} onClick={() => navigate('/income/add')}>
        <AddRoundedIcon />
      </Fab>

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir Renda"
        message="Tem certeza que deseja excluir esta renda?"
        onConfirm={() => { deleteIncome(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </PageWrapper>
  )
}
