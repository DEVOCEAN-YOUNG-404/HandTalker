import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage/MainPage";
import ScrollToTop from "./utils/ScrollToTop";
import TranslatePage from "./pages/TranslatePage/TranslatePage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/translate" element={<TranslatePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
