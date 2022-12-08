import { createTheme, adaptV4Theme } from "@mui/material";

const theme = createTheme(
  adaptV4Theme({
    typography: {
      htmlFontSize: 10,
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#1DD0BE",
      },
      text: {
        primary: "#2B3238",
      },
      secondary: {
        main: "#757575",
      },
    },
  })
);

export default theme;
