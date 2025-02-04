import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2e7d32' },
    background: { 
      default: '#f5f5f5',
      paper: 'rgba(255,255,255,0.9)' 
    }
  },
  shadows: Array(25).fill('0 4px 30px rgba(0, 0, 0, 0.05)'),
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50',
              boxShadow: '0 0 0 2px rgba(76,175,80,0.2)'
            }
          }
        }
      }
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#4caf50' },
    background: { 
      default: '#121212',
      paper: 'rgba(30,30,30,0.9)' 
    }
  },
  shadows: Array(25).fill('0 4px 30px rgba(255, 255, 255, 0.05)'),
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#4caf50',
              boxShadow: '0 0 0 2px rgba(76,175,80,0.2)'
            }
          }
        }
      }
    }
  }
});
