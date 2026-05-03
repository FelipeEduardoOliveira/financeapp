import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <Dialog open={open} onClose={onCancel} PaperProps={{ sx: { borderRadius: 4, mx: 2 } }}>
      <DialogTitle>{title || 'Confirmar'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || 'Tem certeza?'}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} variant="outlined">Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color="error">Excluir</Button>
      </DialogActions>
    </Dialog>
  )
}
