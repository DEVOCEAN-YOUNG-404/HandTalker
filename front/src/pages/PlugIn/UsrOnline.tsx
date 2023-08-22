import discord_blue from "../../assets/images/plugin/discord_blue.png";
import naver from "../../assets/images/plugin/naver.png";
import google from "../../assets/images/plugin/google.png";
import kakaotalk from "../../assets/images/plugin/kakaotalk.png";
import instagram from "../../assets/images/plugin/instagram.png";
import facebook from "../../assets/images/plugin/facebook.png";
import twitter from "../../assets/images/plugin/twitter.png";
import devocean from "../../assets/images/plugin/devocean.png";
import Modal from "./modal/Modal";
import { useState } from "react";

const UsrOnline = () => {
  const [openModal, setOpenModal] = useState(false);
  const onModalAlert = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="min-w-[1366px] h-[100vh] flex flex-row w-full">
      {openModal && <Modal onOpenModal={onModalAlert} />}
      <div className="w-full h-full flex items-start justify-start mt-[100px] flex-col">
        <p className="text-5xl font-bold text-black font-main ml-[118px]">
          플러그인
        </p>
        <div className="flex flex-row items-center justify-center w-full md:scale-75 xl:scale-[85%] 2xl:scale-90 3xl:scale-100">
          <div className="w-[301px] h-[320px] mt-[50px] border border-[#5865F2] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={discord_blue}
              alt="디스코드 로고"
              className="w-auto h-[67px] mt-[10px]"
            />
            <p className="font-main text-lg text-[#5865F2] mt-[40px] text-center">
              Discord에서 HandTalker로 <br />
              번역한 메시지를 전송해보세요
            </p>
            <button
              onClick={onModalAlert}
              className="w-[230px] h-[50px] mt-[20px] text-[#5865F2] font-main text-xl border border-[#5865F2] rounded-xl hover:bg-[#5865F2] hover:text-white hover:drop-shadow-xl transition-colors duration-200"
            >
              연결하기
            </button>
          </div>
          <div className="w-[301px] h-[320px] mt-[50px] ml-[50px] border border-[#03CF5D] flex flex-col items-center justify-center rounded-xl ">
            <img src={naver} alt="로고" className="w-auto h-[67px] mt-[10px]" />
            <p className="font-main text-lg text-[#03CF5D] mt-[40px] text-center">
              네이버에서 HandTalker로 <br />
              번역한 메시지를 검색해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#03CF5D] font-main text-xl border border-[#03CF5D] rounded-xl hover:bg-[#03CF5D] hover:text-white hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
          <div className="w-[301px] h-[320px] mt-[50px] ml-[50px] border border-[#4888F4] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={google}
              alt="로고"
              className="w-auto h-[67px] mt-[10px]"
            />
            <p className="font-main text-lg text-[#4888F4] mt-[40px] text-center">
              Google에서 HandTalker로 <br />
              번역한 메시지를 검색해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#4888F4] font-main text-xl border border-[#4888F4] rounded-xl hover:bg-[#4888F4] hover:text-white hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
          <div className="w-[301px] h-[320px] mt-[50px] ml-[50px] border border-[#381c1e] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={kakaotalk}
              alt="로고"
              className="w-auto h-[67px] scale-150 mt-[10px]"
            />
            <p className="font-main text-lg text-[#381c1e] mt-[40px] text-center">
              카카오톡에서 HandTalker로 <br />
              번역한 메시지를 전송해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#381c1e] font-main text-xl border border-[#381c1e] rounded-xl hover:bg-[#FFE702] hover:border-[#FFE702] hover:text-[#381c1e] hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full md:scale-75 xl:scale-[85%] 2xl:scale-90 3xl:scale-100">
          <div className="w-[301px] h-[320px] mt-[50px] border border-[#E83B6F] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={instagram}
              alt="로고"
              className="w-auto h-[67px] mt-[10px] scale-125"
            />
            <p className="font-main text-lg text-[#E83B6F] mt-[40px] text-center">
              Instagram에서 HandTalker로 <br />
              번역한 메시지를 공유해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#E83B6F] font-main text-xl border border-[#E83B6F] rounded-xl hover:bg-[#E83B6F] hover:text-white hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
          <div className="w-[301px] h-[320px] mt-[50px] ml-[50px] border border-[#3B589E] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={facebook}
              alt="로고"
              className="w-auto h-[67px] mt-[10px] scale-125"
            />
            <p className="font-main text-lg text-[#3B589E] mt-[40px] text-center">
              Facebook에서 HandTalker로 <br />
              번역한 메시지를 공유해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#3B589E] font-main text-xl border border-[#3B589E] rounded-xl hover:bg-[#3B589E] hover:text-white hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
          <div className="w-[301px] h-[320px] mt-[50px] ml-[50px] border border-[#4A98EA] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={twitter}
              alt="로고"
              className="w-auto h-[67px] mt-[10px] scale-125"
            />
            <p className="font-main text-lg text-[#4A98EA] mt-[40px] text-center">
              Twitter에서 HandTalker로 <br />
              번역한 메시지를 공유해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#4A98EA] font-main text-xl border border-[#4A98EA] rounded-xl hover:bg-[#4A98EA] hover:text-white hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
          <div className="w-[301px] h-[320px] mt-[50px] ml-[50px] border border-[#0041FF] flex flex-col items-center justify-center rounded-xl ">
            <img
              src={devocean}
              alt="로고"
              className="w-auto h-[67px] scale-125 mt-[10px]"
            />
            <p className="font-main text-lg text-[#0041FF] mt-[40px] text-center">
              데보션에서 HandTalker로 <br />
              번역한 메시지를 공유해보세요
            </p>
            <button className="w-[230px] h-[50px] mt-[20px] text-[#0041FF] font-main text-xl border border-[#0041FF] rounded-xl hover:bg-[#0041FF] hover:text-[#ffffff] hover:drop-shadow-xl transition-colors duration-200">
              연결하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsrOnline;
