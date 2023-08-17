import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="min-w-[1366px] w-full h-[100vh] flex items-center justify-center flex-col">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
