import { TextInput } from "../../components/Auth/TextInput";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <p className="text-5xl font-bold font-main mb-[50px]">로그인</p>
      <TextInput label="아이디" isPW={false} />
      <TextInput label="비밀번호" isPW={true} />
    </div>
  );
};

export default LoginForm;
