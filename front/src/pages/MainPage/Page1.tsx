import logo from "../../assets/logo.png";
import main from "../../assets/main.png";

const Page1 = () => {
  return (
    <div className="h-[100vh] flex flex-row items-center justify-center mt-[-110px]">
      <div className="flex flex-col items-start justify-start mt-[60px]">
        <p className="font-bold text-black text-[2rem] mb-[10px] font-main">
          내 손 안의 작은 수어 통역가
        </p>
        <img src={logo} alt="logo" className="w-[190px] mb-[20px]" />
        <p className="text-lg text-gray-400 font-main mb-[10px]">
          HandTalker와 함께라면
          <br /> 언제든 수어 번역 서비스를 이용하실 수 있습니다.
        </p>
        <button className="bg-green-500 text-white font-main text-base rounded-md mb-[10px] w-[200px] h-[50px] ">
          번역 서비스 사용해보기
        </button>
      </div>
      <img
        src={main}
        alt="main"
        className="block w-[600px] ml-[120px] mt-[60px]"
      />
    </div>
  );
};

export default Page1;
