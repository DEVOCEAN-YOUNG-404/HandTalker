import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="min-w-[1366px] w-full h-[100vh] flex items-center justify-center flex-col">
      <Header />
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUp;
