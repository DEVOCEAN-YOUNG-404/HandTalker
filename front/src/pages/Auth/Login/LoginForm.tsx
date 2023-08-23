import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../../utils/recoil/atom";
import Swal from "sweetalert2";
import { LoginFormData } from "../../../types/LoginFormData";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useSetRecoilState(authState);
  const auth = getAuth();
  const [emailError, setEmailError] = useState<string>("");
  const [pwError, setPwError] = useState<string>("");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const loginHandler = (data: LoginFormData) => {
    // console.log(data.email, data.password);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        console.log(user);
        localStorage.setItem("UID", user);
        login(true);
        navigate("/");
        Toast.fire({
          icon: "success",
          title: "로그인 성공!",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);

        if (errorCode === "auth/wrong-password") {
          setPwError("비밀번호가 일치하지 않습니다");
        }
        if (errorCode === "auth/user-not-found") {
          setEmailError("존재하지 않는 이메일입니다");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-5xl font-bold font-main mb-[50px]">로그인</p>
      <form onSubmit={handleSubmit(loginHandler)} className="w-[310px]">
        <div className="mb-3 outline-none">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "올바른 이메일 형식이 아닙니다",
              },
            }}
            render={({ field }) => (
              <div
                className={`outline mb-3 ${
                  errors.email || emailError ? "border-red-500" : ""
                } flex items-center relative w-[310px] h-[48px] transition-colors duration-300 border border-gray-300 px-2 rounded-lg focus-within:border-main-2 outline-none`}
              >
                <input
                  type="text"
                  {...field}
                  placeholder=" "
                  className="block w-full h-full bg-transparent appearance-none focus:outline-none"
                />
                <label
                  htmlFor="email"
                  className="absolute duration-300 bg-white origin-0 text-start -z-10"
                >
                  이메일
                </label>
              </div>
            )}
          />
          <p
            className={`${
              errors.email || emailError ? "mt-[-7px]" : ""
            } text-xs text-red-500 font-main`}
          >
            {errors.email?.message || emailError}
          </p>
        </div>
        <div className="mb-3 outline-none">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다",
              },
            }}
            render={({ field }) => (
              <div
                className={`outline mb-3 ${
                  errors.password || pwError ? "border-red-500" : ""
                } flex items-center relative w-[310px] h-[48px] transition-colors duration-300 border border-gray-300 px-2 rounded-lg focus-within:border-main-2 outline-none`}
              >
                <input
                  type="password"
                  {...field}
                  placeholder=" "
                  className="block w-full h-full bg-transparent appearance-none focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="absolute duration-300 bg-white origin-0 text-start -z-10"
                >
                  비밀번호
                </label>
              </div>
            )}
          />
          <p
            className={`${
              errors.password || pwError ? "mt-[-7px]" : ""
            } text-xs text-red-500 font-main`}
          >
            {errors.password?.message || pwError}
          </p>
        </div>
        <button
          type="submit"
          className="w-[310px] h-[48px] bg-main-2 rounded-lg font-main font-bold text-lg text-white transition-colors duration-150 hover:bg-green-600"
        >
          로그인
        </button>
      </form>
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
