import "@/styles/globals.css";
import Header from "@common/Header";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 7,
              backgroundColor: "#fff",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 7,
              backgroundColor: "#fff",
            },
          },
        },
      ],
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          backgroundColor: "#fff",
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#2379BC",
    },
    success: {
      main: "#2CC069",
    },
    error: {
      main: "#E94242",
    },
    warning: {
      main: "#c79000",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
