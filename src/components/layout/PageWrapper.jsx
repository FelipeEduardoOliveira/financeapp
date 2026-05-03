import Box from '@mui/material/Box'

export default function PageWrapper({ children, noPadding = false }) {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        pb: '80px',
        px: noPadding ? 0 : 2,
        pt: noPadding ? 0 : 2,
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      {children}
    </Box>
  )
}
