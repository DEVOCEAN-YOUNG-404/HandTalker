import logo from "../../assets/icons/logo.svg";
import seungjun from "../../assets/images/seungjun.webp";
import sujin from "../../assets/images/sujin.webp";
import hyeonbin from "../../assets/images/hyeonbin.webp";
import bokyeong from "../../assets/images/bokyeong.webp";
import { AiFillGithub } from "react-icons/ai";
import LazyLoad from "react-lazy-load";

const Page5 = () => {
  return (
    <div
      id="section5"
      className="w-full h-[100vh] flex flex-col justify-center"
    >
      <div className="flex flex-col items-center justify-center md:mx-auto">
        <div className="flex flex-row items-center justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-auto h-[1.4rem] md:h-[2rem] block"
          />
          <p className="ml-[10px] text-2xl md:text-4xl font-bold text-black font-main">
            를 만든 사람들
          </p>
        </div>
        <p className="mt-2 text-xl font-bold text-black md:mt-5 md:text-3xl font-main">
          DEVOCEAN YOUNG 2기 404
        </p>
      </div>
      <div className="flex flex-col items-center justify-center md:mt-[20px]">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-start mt-[50px] md:ml-[10px] w-[200px] md:w-[400px]">
            <div className="w-[80px] h-[80px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
              <img src={sujin} alt="sujin" className="w-full" />
            </div>
            <div className="flex flex-col items-center md:items-start justify-center md:ml-[20px]">
              <p className="mt-2 text-2xl font-bold text-black md:m-0 md:text-4xl font-main">
                곽수진
              </p>
              <p className="text-xl md:text-2xl text-black font-main mt-[2px] md:mt-[10px]">
                웹 백엔드
              </p>
              <p className="text-3xl md:text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
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
          <div className="flex flex-col md:flex-row items-center justify-start mt-[50px] md:ml-[10px] w-[200px] md:w-[400px]">
            <div className="w-[80px] h-[80px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
              <img src={bokyeong} alt="bokyeong" className="w-full" />
            </div>
            <div className="flex flex-col items-center md:items-start justify-center md:ml-[20px]">
              <p className="mt-2 text-2xl font-bold text-black md:m-0 md:text-4xl font-main">
                송보경
              </p>
              <p className="text-xl md:text-2xl text-black font-main mt-[2px] md:mt-[10px]">
                PM / 웹 백엔드
              </p>
              <p className="text-3xl md:text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
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
        <div className="flex flex-row items-center justify-center mt-[10px] md:mt-[50px]">
          <div className="flex flex-col md:flex-row items-center justify-start mt-[50px] md:ml-[10px] w-[200px] md:w-[400px]">
            <div className="w-[80px] h-[80px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
              <img src={seungjun} alt="seungjun" className="w-full" />
            </div>
            <div className="flex flex-col items-center md:items-start justify-center md:ml-[20px]">
              <p className="mt-2 text-2xl font-bold text-black md:m-0 md:text-4xl font-main">
                정승준
              </p>
              <p className="text-xl md:text-2xl text-black font-main mt-[2px] md:mt-[10px]">
                웹 프론트엔드
              </p>
              <p className="text-3xl md:text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
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
          <div className="flex flex-col md:flex-row items-center justify-start mt-[50px] md:ml-[10px] w-[200px] md:w-[400px]">
            <div className="w-[80px] h-[80px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden">
              <img src={hyeonbin} alt="hyeonbin" className="w-full" />
            </div>
            <div className="flex flex-col items-center md:items-start justify-center md:ml-[20px]">
              <p className="mt-2 text-2xl font-bold text-black md:m-0 md:text-4xl font-main">
                지현빈
              </p>
              <p className="text-xl md:text-2xl text-black font-main mt-[2px] md:mt-[10px]">
                머신러닝
              </p>
              <p className="text-3xl md:text-5xl mt-[10px] opacity-40 hover:opacity-100 cursor-pointer">
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
