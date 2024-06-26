import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { UserTokenProvider } from "./contexts/UserTokenContext.jsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx";
import theme from "./theme";
import { FormContextProvider } from "./contexts/FormContext.jsx";
import { RatingContextProvider } from "./contexts/RatingContext.jsx";

function App() {
  return (
    <RatingContextProvider>
      <FormContextProvider>
        <UserTokenProvider>
          <ThemeProvider theme={theme}>
            <DarkModeProvider>
              <Header />
              <Main />
              <Footer />
            </DarkModeProvider>
          </ThemeProvider>
        </UserTokenProvider>
      </FormContextProvider>
    </RatingContextProvider>
  );
}

export default App;
