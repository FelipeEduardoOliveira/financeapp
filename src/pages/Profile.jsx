import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import useStore from '../store/useStore'
import PageWrapper from '../components/layout/PageWrapper'

export default function Profile() {
  const navigate = useNavigate()
  const user = useStore((s) => s.user)
  const updateProfile = useStore((s) => s.updateProfile)
  const logout = useStore((s) => s.logout)
  const darkMode = useStore((s) => s.darkMode)
  const toggleDarkMode = useStore((s) => s.toggleDarkMode)
  const showSnackbar = useStore((s) => s.showSnackbar)

  const [name, setName] = useState(user?.name || '')

  const handleSave = () => {
    if (!name.trim()) return
    updateProfile({ name: name.trim() })
    showSnackbar('Perfil atualizado!')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const initials = user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '?'

  return (
    <PageWrapper>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Perfil
      </Typography>

      {/* Avatar */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: 28,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #5C6BC0, #26A69A)',
            mb: 1,
          }}
        >
          {initials}
        </Avatar>
        <Typography variant="h6" fontWeight={600}>{user?.name}</Typography>
        <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
      </Box>

      {/* Edit Name */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle2" fontWeight={600} mb={2}>
            Editar Perfil
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
            <TextField
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
            />
            <Button variant="contained" onClick={handleSave} sx={{ whiteSpace: 'nowrap', minWidth: 80 }}>
              Salvar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {darkMode ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Tema {darkMode ? 'Escuro' : 'Claro'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Alternar aparência
                </Typography>
              </Box>
            </Box>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Box>
        </CardContent>
      </Card>

      {/* Logout */}
      <Button
        variant="outlined"
        color="error"
        fullWidth
        size="large"
        startIcon={<LogoutRoundedIcon />}
        onClick={handleLogout}
        sx={{ mt: 1 }}
      >
        Sair da Conta
      </Button>
    </PageWrapper>
  )
}
