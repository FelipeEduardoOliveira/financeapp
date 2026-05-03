import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import useStore from '../store/useStore'
import PageWrapper from '../components/layout/PageWrapper'

const today = new Date().toISOString().split('T')[0]

export default function IncomeForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const incomes = useStore((s) => s.incomes)
  const addIncome = useStore((s) => s.addIncome)
  const updateIncome = useStore((s) => s.updateIncome)
  const isEditing = Boolean(id)

  const [form, setForm] = useState({ name: '', value: '', type: 'fixed', date: today })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing) {
      const inc = incomes.find((i) => i.id === id)
      if (inc) setForm({ name: inc.name, value: String(inc.value), type: inc.type, date: inc.date })
    }
  }, [id])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Nome obrigatório'
    if (!form.value || isNaN(Number(form.value)) || Number(form.value) <= 0) errs.value = 'Valor inválido'
    if (!form.date) errs.date = 'Data obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const data = { ...form, value: parseFloat(form.value) }
    if (isEditing) updateIncome(id, data)
    else addIncome(data)
    navigate('/income')
  }

  return (
    <PageWrapper>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <IconButton onClick={() => navigate('/income')}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>
          {isEditing ? 'Editar Renda' : 'Nova Renda'}
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nome" value={form.name} onChange={set('name')} fullWidth error={!!errors.name} helperText={errors.name} />

          <TextField
            label="Valor"
            value={form.value}
            onChange={set('value')}
            fullWidth
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
            error={!!errors.value}
            helperText={errors.value}
          />

          <FormControl fullWidth>
            <InputLabel>Tipo</InputLabel>
            <Select value={form.type} label="Tipo" onChange={set('type')}>
              <MenuItem value="fixed">Fixo</MenuItem>
              <MenuItem value="variable">Variável</MenuItem>
            </Select>
          </FormControl>

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

          <Button variant="contained" color="secondary" size="large" onClick={handleSubmit} fullWidth sx={{ mt: 1 }}>
            {isEditing ? 'Salvar' : 'Adicionar'}
          </Button>
        </CardContent>
      </Card>
    </PageWrapper>
  )
}
