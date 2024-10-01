// src/themes/theme.js
import { createTheme } from '@mui/material/styles';

const commonThemeOptions = {
  typography: {
    fontFamily: 'Roboto, Arial',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
        },
      },
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1E88E5' }, // Pleasant blue
    secondary: { main: '#FF4081' }, // Pink for contrast
    background: {
      default: '#FFFFFF',
    },
  },
  ...commonThemeOptions,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90CAF9' }, // Lighter blue for dark mode
    secondary: { main: '#F48FB1' },
    background: {
      default: '#121212',
    },
  },
  ...commonThemeOptions,
});

export { lightTheme, darkTheme };
