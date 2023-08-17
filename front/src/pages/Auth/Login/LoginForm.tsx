import { TextInput } from "../../../components/Auth/TextInput";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-5xl font-bold font-main mb-[50px]">로그인</p>
      <TextInput label="아이디" isPW={false} />
      <TextInput label="비밀번호" isPW={true} />
      <button className="w-[310px] h-[48px] bg-main-2 rounded-lg font-main font-bold text-lg text-white transition-colors duration-150 hover:bg-green-600">
        로그인
      </button>
      <div className="flex flex-row mt-[20px]">
        <p className="text-gray-400 text-md font-main ">계정이 없으신가요?</p>
        <Link to="/signup">
          <p className="ml-1 font-semibold text-main-2 text-md font-main">
            회원가입 하기
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
