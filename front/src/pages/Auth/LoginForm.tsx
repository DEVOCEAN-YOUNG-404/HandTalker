import { TextInput } from "../../components/Auth/TextInput";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-5xl font-bold font-main mb-[50px]">로그인</p>
      <TextInput label="아이디" isPW={false} />
      <TextInput label="비밀번호" isPW={true} />
      <button className="w-[310px] h-[48px] bg-main-2 rounded-lg font-main font-bold text-lg text-white">
        로그인
      </button>
    </div>
  );
};

export default LoginForm;
