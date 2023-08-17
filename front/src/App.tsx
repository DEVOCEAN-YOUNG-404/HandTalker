import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage/MainPage";
import ScrollToTop from "./utils/ScrollToTop";
import TranslatePage from "./pages/TranslatePage/TranslatePage";
import Plugin from "./pages/PlugIn/PlugIn";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SIgnUp/SignUp";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/plugin" element={<Plugin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
