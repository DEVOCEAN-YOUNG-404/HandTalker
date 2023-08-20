import discord from "../../assets/icons/discord.png";
import Modal from "./modal/Modal";
import { useState } from "react";

const UsrOnline = () => {
  const [openModal, setOpenModal] = useState(false);
  const onModalAlert = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="min-w-[1366px] h-[100vh] flex flex-col">
      {openModal && <Modal onOpenModal={onModalAlert} />}
      <div className="min-w-[1105px] h-full mr-[400px] flex items-start justify-start ml-[118px] mt-[100px] flex-col pb-[20px]">
        <p className="text-5xl font-bold text-black font-main">플러그인</p>
        <a
          href="https://discord.com/api/oauth2/authorize?client_id=1139091593282981888&permissions=8&scope=bot%20applications.commands"
          target="_blank"
          rel="noreferrer"
        >
          aa
        </a>
        <button
          onClick={onModalAlert}
          className="flex flex-row justify-center items-center rounded-xl w-[300px] h-[50px] bg-[#5865f2] text-white font-main text-xl"
        >
          <img src={discord} alt="discord" className="w-[50px] mr-[5px]" />
          디스코드 봇 추가
        </button>
        <button className="flex flex-row justify-center items-center bg-main-2 w-[300px] h-[50px] text-xl text-white font-main mt-[20px] rounded-xl">
          디스코드 연결 정보 확인
        </button>
      </div>
    </div>
  );
};

export default UsrOnline;
