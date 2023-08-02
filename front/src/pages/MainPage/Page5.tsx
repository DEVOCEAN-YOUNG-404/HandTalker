import logo from "../../assets/logo.png";
import seungjun from "../../assets/seungjun.jpeg";
import { AiFillGithub } from "react-icons/ai";
const Page5 = () => {
  return (
    <div
      id="section5"
      className="ml-[440px] mr-[440px] w-full h-[600px] mt-[150px] flex flex-col items-start justify-center"
    >
      <div className="flex flex-row items-center justify-center">
        <img src={logo} alt="logo" className="w-[250px]" />
        <p className="ml-[10px] text-4xl font-bold text-black font-main">
          를 만든 사람들
        </p>
      </div>
      <div className="flex flex-col items-start justify-center mt-[20px]">
        <p className="text-3xl font-bold text-black font-main">
          DEVOCEAN YOUNG 2기 404
        </p>
        <div className="flex flex-row items-center justify-start mt-[50px] ml-[10px] w-[400px]">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
            <img src={seungjun} alt="seungjun" className="w-full" />
          </div>
          <div className="flex flex-col items-start justify-center ml-[20px]">
            <p className="text-4xl font-bold text-black font-main">정승준</p>
            <p className="text-2xl text-black font-main mt-[10px]">
              웹 프론트엔드
            </p>
            <p className="text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
              <AiFillGithub />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5;
