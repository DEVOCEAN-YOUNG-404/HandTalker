import { useForm, Controller } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const signupHandler = (data: FormData) => {
    console.log(data.email, data.password);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-5xl font-bold font-main mb-[50px]">회원가입</p>
      <form onSubmit={handleSubmit(signupHandler)} className="w-[310px]">
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
                  errors.email ? "border-red-500" : ""
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
              errors.email ? "mt-[-7px]" : ""
            } text-xs text-red-500 font-main`}
          >
            {errors.email?.message}
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
                  errors.password ? "border-red-500" : ""
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
              errors.password ? "mt-[-7px]" : ""
            } text-xs text-red-500 font-main`}
          >
            {errors.password?.message}
          </p>
        </div>
        <div className="mb-3 outline-none">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "비밀번호를 다시 입력해주세요",
              validate: (value) =>
                value === getValues("password") ||
                "비밀번호가 일치하지 않습니다",
            }}
            render={({ field }) => (
              <div
                className={`outline mb-3 ${
                  errors.confirmPassword ? "border-red-500" : ""
                } flex items-center relative w-[310px] h-[48px] transition-colors duration-300 border border-gray-300 px-2 rounded-lg outline-none`}
              >
                <input
                  type="password"
                  {...field}
                  placeholder=" "
                  className="block w-full h-full bg-transparent appearance-none focus:outline-none"
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute duration-300 bg-white origin-0 text-start -z-10"
                >
                  비밀번호 재입력
                </label>
              </div>
            )}
          />
          <p
            className={`${
              errors.confirmPassword ? "mt-[-7px]" : ""
            } text-xs text-red-500 font-main`}
          >
            {errors.confirmPassword?.message}
          </p>
        </div>
        <button
          type="submit"
          className="w-[310px] h-[48px] bg-main-2 rounded-lg font-main font-bold text-lg text-white transition-colors duration-150 hover:bg-green-600"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
