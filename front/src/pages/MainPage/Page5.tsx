import logo from "../../assets/icons/logo.png";
import seungjun from "../../assets/images/seungjun.jpeg";
import sujin from "../../assets/images/sujin.jpeg";
import hyeonbin from "../../assets/images/hyeonbin.png";
import bokyeong from "../../assets/images/bokyeong.jpeg";
import { AiFillGithub } from "react-icons/ai";

const Page5 = () => {
  return (
    <div
      id="section5"
      className="w-full h-[100vh] flex flex-col justify-center"
    >
      <div className="w-[956px] flex flex-col items-start justify-center mx-auto">
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="logo" className="w-[250px] block" />
          <p className="ml-[10px] text-4xl font-bold text-black font-main">
            를 만든 사람들
          </p>
        </div>
        <p className="mt-5 text-3xl font-bold text-black font-main">
          DEVOCEAN YOUNG 2기 404
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-[20px]">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-row items-center justify-start mt-[50px] ml-[10px] w-[400px]">
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
              <img src={sujin} alt="seungjun" className="w-full" />
            </div>
            <div className="flex flex-col items-start justify-center ml-[20px]">
              <p className="text-4xl font-bold text-black font-main">곽수진</p>
              <p className="text-2xl text-black font-main mt-[10px]">
                웹 백엔드
              </p>
              <p className="text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
                <a
                  href="https://github.com/Gwaksujin"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub />
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start mt-[50px] ml-[140px] w-[400px]">
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
              <img src={bokyeong} alt="seungjun" className="w-full" />
            </div>
            <div className="flex flex-col items-start justify-center ml-[20px]">
              <p className="text-4xl font-bold text-black font-main">송보경</p>
              <p className="text-2xl text-black font-main mt-[10px]">
                PM / 웹 백엔드
              </p>
              <p className="text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
                <a
                  href="https://github.com/Muon05"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub />
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-[30px]">
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
                <a
                  href="https://github.com/whateveriiwant"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub />
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start mt-[50px] ml-[140px] w-[400px]">
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
              <img src={hyeonbin} alt="seungjun" className="w-full" />
            </div>
            <div className="flex flex-col items-start justify-center ml-[20px]">
              <p className="text-4xl font-bold text-black font-main">지현빈</p>
              <p className="text-2xl text-black font-main mt-[10px]">
                머신러닝
              </p>
              <p className="text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
                <a
                  href="https://github.com/hyeonbinji"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5;
