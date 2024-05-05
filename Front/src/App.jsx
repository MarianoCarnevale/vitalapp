import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { UserTokenProvider } from "./contexts/UserTokenContext.jsx";

function App() {
  return (
    <>
      <UserTokenProvider>
        <Header />
        <Main />
        <Footer />
      </UserTokenProvider>
    </>
  );
}

export default App;
