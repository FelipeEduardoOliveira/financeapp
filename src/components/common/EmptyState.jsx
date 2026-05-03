import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'

export default function EmptyState({ message = 'Nenhum item encontrado' }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, opacity: 0.5 }}>
      <InboxRoundedIcon sx={{ fontSize: 56, mb: 1 }} />
      <Typography variant="body2">{message}</Typography>
    </Box>
  )
}
