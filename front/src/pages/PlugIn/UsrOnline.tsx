import discord from "../../assets/icons/discord.png";
import plugin1 from "../../assets/images/plugin1.png";
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
        <p className="text-xl text-gray-500 font-main mt-[20px]">
          디스코드와 HandTalker를 연결할 수 있습니다.
        </p>
        <button
          onClick={onModalAlert}
          className="mt-[20px] flex flex-row justify-center items-center rounded-xl w-[300px] h-[50px] bg-[#5865f2] text-white font-main text-xl"
        >
          <img src={discord} alt="discord" className="w-[50px] mr-[5px]" />
          디스코드 연결 가이드
        </button>
        <button className="flex flex-row justify-center items-center bg-main-2 w-[300px] h-[50px] text-xl text-white font-main mt-[20px] rounded-xl">
          디스코드 연결 정보 확인
        </button>
      </div>
      <div className="w-full max-h-[700px] flex justify-end items-center">
        <img
          src={plugin1}
          alt="디스코드 화면"
          className="mt-[120px] max-h-[700px] w-auto"
        />
      </div>
    </div>
  );
};

export default UsrOnline;
