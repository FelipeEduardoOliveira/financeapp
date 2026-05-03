import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import useStore from '../store/useStore'
import PageWrapper from '../components/layout/PageWrapper'

const today = new Date().toISOString().split('T')[0]

export default function DebtForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const debts = useStore((s) => s.debts)
  const addDebt = useStore((s) => s.addDebt)
  const updateDebt = useStore((s) => s.updateDebt)
  const isEditing = Boolean(id)

  const [form, setForm] = useState({ name: '', totalValue: '', paidValue: '0', date: today })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      const debt = debts.find((d) => d.id === id)
      if (debt) setForm({
        name: debt.name,
        totalValue: String(debt.totalValue),
        paidValue: String(debt.paidValue),
        date: debt.date,
      })
    }
  }, [id])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nome obrigatório'
    if (!form.totalValue || isNaN(Number(form.totalValue)) || Number(form.totalValue) <= 0) errs.totalValue = 'Valor inválido'
    if (form.paidValue === '' || isNaN(Number(form.paidValue)) || Number(form.paidValue) < 0) errs.paidValue = 'Valor inválido'
    if (Number(form.paidValue) > Number(form.totalValue)) errs.paidValue = 'Valor pago maior que total'
    if (!form.date) errs.date = 'Data obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const data = { ...form, totalValue: parseFloat(form.totalValue), paidValue: parseFloat(form.paidValue) }
    if (isEditing) updateDebt(id, data)
    else addDebt(data)
    navigate('/debts')
  }

  return (
    <PageWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate('/debts')}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>
          {isEditing ? 'Editar Dívida' : 'Nova Dívida'}
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nome" value={form.name} onChange={set('name')} fullWidth error={!!errors.name} helperText={errors.name} />

          <TextField
            label="Valor Total"
            value={form.totalValue}
            onChange={set('totalValue')}
            fullWidth
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
            error={!!errors.totalValue}
            helperText={errors.totalValue}
          />

          <TextField
            label="Valor Pago"
            value={form.paidValue}
            onChange={set('paidValue')}
            fullWidth
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
            error={!!errors.paidValue}
            helperText={errors.paidValue}
          />

          <TextField
            label="Data"
            type="date"
            value={form.date}
            onChange={set('date')}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date}
          />

          <Button variant="contained" color="error" size="large" onClick={handleSubmit} fullWidth sx={{ mt: 1 }}>
            {isEditing ? 'Salvar' : 'Adicionar'}
          </Button>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}
