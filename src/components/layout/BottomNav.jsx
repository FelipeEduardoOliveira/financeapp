import { useNavigate, useLocation } from 'react-router-dom'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'

const routes = [
  { path: '/dashboard', icon: <DashboardRoundedIcon />, label: 'Início' },
  { path: '/expenses', icon: <AccountBalanceWalletRoundedIcon />, label: 'Gastos' },
  { path: '/income', icon: <TrendingUpRoundedIcon />, label: 'Renda' },
  { path: '/debts', icon: <CreditCardRoundedIcon />, label: 'Dívidas' },
  { path: '/profile', icon: <PersonRoundedIcon />, label: 'Perfil' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentValue = routes.findIndex((r) => location.pathname.startsWith(r.path))

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={0}
    >
      <BottomNavigation
        value={currentValue === -1 ? 0 : currentValue}
        onChange={(_, v) => navigate(routes[v].path)}
      >
        {routes.map((r) => (
          <BottomNavigationAction
            key={r.path}
            label={r.label}
            icon={r.icon}
            sx={{ minWidth: 0 }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  )
}
