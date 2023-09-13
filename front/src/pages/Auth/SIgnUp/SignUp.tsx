import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Header />
      <SignUpForm />
      <Footer />
    </div>
  );
};

export default SignUp;
