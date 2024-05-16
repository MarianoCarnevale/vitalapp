import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { UserTokenProvider } from "./contexts/UserTokenContext.jsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import theme from "./theme";

function App() {
  return (
    <UserTokenProvider>
      <ThemeProvider theme={theme}>
        <DarkModeProvider>
          <Header />
          <Main />
          <Footer />
        </DarkModeProvider>
      </ThemeProvider>
    </UserTokenProvider>
  );
}

export default App;
