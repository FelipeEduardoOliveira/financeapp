import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import useStore from '../../store/useStore'

export default function GlobalSnackbar() {
  const snackbar = useStore((s) => s.snackbar)
  const closeSnackbar = useStore((s) => s.closeSnackbar)

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%', borderRadius: 3 }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}
