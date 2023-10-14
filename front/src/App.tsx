import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { RecoilRoot } from "recoil";
import ScrollToTop from "./utils/helpers/ScrollToTop";
import { Fallback } from "./utils/Fallback";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const TranslatePage = lazy(() => import("./pages/TranslatePage/TranslatePage"));
const Plugin = lazy(() => import("./pages/PlugIn/PlugIn"));
const Login = lazy(() => import("./pages/Auth/Login/Login"));
const SignUp = lazy(() => import("./pages/Auth/SIgnUp/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <RecoilRoot>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/translate" element={<TranslatePage />} />
            <Route path="/plugin" element={<Plugin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
}

export default App;
