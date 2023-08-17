import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { TextInput } from "../../../components/Auth/TextInput";

const SignUp = () => {
  return (
    <div className="min-w-[1366px] w-full h-[100vh] flex items-center justify-center flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl font-bold font-main mb-[50px]">회원가입</p>
        <TextInput label="아이디" isPW={false} />
        <TextInput label="비밀번호" isPW={true} />
        <TextInput label="비밀번호 재입력" isPW={true} />
        <button className="w-[310px] h-[48px] bg-main-2 rounded-lg font-main font-bold text-lg text-white transition-colors duration-150 hover:bg-green-600">
          회원가입
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
