import { createTheme } from '@mui/material/styles'

const baseTypography = {
  fontFamily: '"Sora", sans-serif',
  h1: { fontWeight: 700 },
  h2: { fontWeight: 700 },
  h3: { fontWeight: 600 },
  h4: { fontWeight: 600 },
  h5: { fontWeight: 600 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: 'none' },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#5C6BC0', light: '#8e99f3', dark: '#26418f' },
    secondary: { main: '#26A69A', light: '#64d8cb', dark: '#00766c' },
    error: { main: '#EF5350' },
    success: { main: '#66BB6A' },
    warning: { main: '#FFA726' },
    background: { default: '#F5F5F7', paper: '#FFFFFF' },
  },
  typography: baseTypography,
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, padding: '12px 24px' },
        contained: { boxShadow: 'none', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: { height: 64, borderTop: '1px solid rgba(0,0,0,0.06)' },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7986CB', light: '#aab6fb', dark: '#49599a' },
    secondary: { main: '#4DB6AC', light: '#82e9de', dark: '#00867d' },
    error: { main: '#EF9A9A' },
    success: { main: '#A5D6A7' },
    warning: { main: '#FFCC80' },
    background: { default: '#0F1117', paper: '#1A1D27' },
  },
  typography: baseTypography,
  shape: { borderRadius: 16 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
          background: '#1A1D27',
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, padding: '12px 24px' },
        contained: { boxShadow: 'none' },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: { height: 64, background: '#1A1D27', borderTop: '1px solid rgba(255,255,255,0.06)' },
      },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
  },
})
