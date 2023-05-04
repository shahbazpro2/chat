import '@/styles/globals.css'
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material'
const theme = createTheme({
  palette: {
    primary: {
      main: '#2379BC'
    },
    success: {
      main: '#2CC069'
    },
    error: {
      main: '#E94242'
    }
  }
})

export default function App({ Component, pageProps }) {
  return <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </StyledEngineProvider>

}
