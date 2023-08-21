import discord from "../../assets/icons/discord.png";
import plugin1 from "../../assets/images/plugin1.png";
import discord_blue from "../../assets/images/plugin/discord_blue.png";
import Modal from "./modal/Modal";
import { useState } from "react";

const UsrOnline = () => {
  const [openModal, setOpenModal] = useState(false);
  const onModalAlert = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="h-[100vh] flex flex-row w-full">
      {openModal && <Modal onOpenModal={onModalAlert} />}
      <div className="w-full h-full flex items-start justify-start ml-[118px] mt-[100px] flex-col">
        <p className="text-5xl font-bold text-black font-main">플러그인</p>
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
      </div>
    </div>
  );
};

export default UsrOnline;
