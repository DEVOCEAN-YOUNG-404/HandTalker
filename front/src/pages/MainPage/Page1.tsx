import LazyLoad from "react-lazy-load";
import logo from "../../assets/icons/logo.svg";
import main from "../../assets/images/main.webp";
import { Link } from "react-router-dom";

const Page1 = () => {
  return (
    <div
      id="section1"
      className="h-[100vh] flex flex-col md:flex-row items-center justify-center w-full"
    >
      <div className="flex flex-col items-start justify-start mt-16">
        <p className="font-bold text-black text-[2rem] mb-[10px] font-main">
          내 손 안의 작은 수어 통역가
        </p>
        <LazyLoad>
          <img src={logo} alt="logo" className="w-[190px] mb-[20px]" />
        </LazyLoad>

        <p className="text-lg text-gray-400 font-main mb-[10px]">
          HandTalker와 함께라면
          <br /> 언제든 수어 번역 서비스를 이용하실 수 있습니다.
        </p>
        <Link to="/translate">
          <button className="bg-green-500 text-white font-main text-base rounded-md mb-[10px] w-[200px] h-[50px] ">
            번역 서비스 사용해보기
          </button>
        </Link>
      </div>
      <img
        src={main}
        alt="main"
        className="hidden md:block w-auto md:h-[17rem] lg:h-[20rem] 2xl:h-[25rem] ml-[120px] mt-[60px]"
      />
    </div>
  );
};

export default Page1;
