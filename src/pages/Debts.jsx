import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Fab from '@mui/material/Fab'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import useStore from '../store/useStore'
import { formatCurrency, formatDate } from '../utils/format'
import PageWrapper from '../components/layout/PageWrapper'
import EmptyState from '../components/common/EmptyState'
import ConfirmDialog from '../components/common/ConfirmDialog'

export default function Debts() {
  const navigate = useNavigate()
  const debts = useStore((s) => s.debts)
  const deleteDebt = useStore((s) => s.deleteDebt)
  const [deleteId, setDeleteId] = useState(null)

  const totalDebt = debts.reduce((s, d) => s + Number(d.totalValue), 0)
  const totalPaid = debts.reduce((s, d) => s + Number(d.paidValue), 0)
  const overallProgress = totalDebt > 0 ? (totalPaid / totalDebt) * 100 : 0

  return (
    <PageWrapper>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Dívidas
      </Typography>

      {/* Summary */}
      <Card sx={{ background: 'linear-gradient(135deg, #EF5350, #AB47BC)', color: '#fff', mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>Total em Dívidas</Typography>
          <Typography variant="h5" fontWeight={700}>{formatCurrency(totalDebt - totalPaid)}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            Pago: {formatCurrency(totalPaid)} de {formatCurrency(totalDebt)}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{ mt: 1.5, borderRadius: 4, height: 6, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: '#fff' } }}
          />
        </CardContent>
      </Card>

      {debts.length === 0 ? (
        <EmptyState message="Nenhuma dívida cadastrada" />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {debts.map((debt) => {
            const progress = debt.totalValue > 0 ? (Number(debt.paidValue) / Number(debt.totalValue)) * 100 : 0
            const remaining = Number(debt.totalValue) - Number(debt.paidValue)
            return (
              <Card key={debt.id}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" fontWeight={600}>{debt.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{formatDate(debt.date)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton size="small" onClick={() => navigate(`/debts/edit/${debt.id}`)}>
                        <EditRoundedIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => setDeleteId(debt.id)}>
                        <DeleteRoundedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Pago</Typography>
                      <Typography variant="body2" fontWeight={600} color="success.main">{formatCurrency(debt.paidValue)}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">Restante</Typography>
                      <Typography variant="body2" fontWeight={600} color="error.main">{formatCurrency(remaining)}</Typography>
                    </Box>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    color={progress >= 100 ? 'success' : 'primary'}
                    sx={{ borderRadius: 4, height: 8 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ float: 'right', mt: 0.5 }}>
                    {progress.toFixed(0)}%
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      )}

      <Fab color="error" sx={{ position: 'fixed', bottom: 80, right: 16 }} onClick={() => navigate('/debts/add')}>
        <AddRoundedIcon />
      </Fab>

      <ConfirmDialog
        open={!!deleteId}
        title="Excluir Dívida"
        message="Tem certeza que deseja excluir esta dívida?"
        onConfirm={() => { deleteDebt(deleteId); setDeleteId(null) }}
        onCancel={() => setDeleteId(null)}
      />
    </PageWrapper>
  )
}
