"use client";

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, sans-serif',
  },
  palette: {
    background: {
      default: 'rgba(var(--background))',
      paper: 'rgba(var(--background))',
    },
    text: {
      primary: 'rgba(var(--foreground))',
      secondary: 'rgba(var(--foreground), 0.7)',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(var(--foreground), 0.6)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: 'rgba(var(--foreground), 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--foreground)',
          },
        },
      },
    },
  },
});

export default theme;
