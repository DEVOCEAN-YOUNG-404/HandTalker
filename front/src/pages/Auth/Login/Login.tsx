import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
