import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
    fontSize: 8,
  },

  palette: {
    primary: {
      main: '#1DD0BE',
      contrastText: '#fff',
    },

    text: {
      primary: '#2B3238',
    },
  },

  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '30px',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        inputProps: {
          style: {
            height: '1em',
          },
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },

    MuiInputBase: {
      defaultProps: {
        inputProps: {
          style: {
            height: '1em',
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          height: '1em',
        },
      },
    },

    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '13.32px 14px',
        },
      },
    },
  },
});

export default theme;
