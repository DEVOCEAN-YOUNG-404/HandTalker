import { FaArrowRightLong } from "react-icons/fa6";
import Input from "./Input";
import { translateState, resultText, dchannel } from "../../utils/recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsPersonFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import discord from "../../assets/icons/discord.png";
import { BiCopy, BiRevision } from "react-icons/bi";
import Swal from "sweetalert2";
import ConfigModal from "./config/ConfigModal";

const Translate = () => {
  const [openModal, setOpenModal] = useState(false);
  const onModalAlert = () => {
    setOpenModal(!openModal);
  };

  const [translate, setTranslate] = useRecoilState(translateState);
  const onClick = () => {
    setTranslate(true);
  };

  const [text, setText] = useRecoilState(resultText);

  const channel = useRecoilValue(dchannel);

  const SendMessage = () => {
    if (!(channel === "")) {
      axios
        .post("https://localhost:3002/api/send_message", {
          message: text,
          CHANNEL_ID: channel,
        })
        .then((response) => console.log(response.data))
        .catch((e) => console.error(e));
    }
  };

  const copyToClipboardHandler = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      Toast.fire({
        icon: "success",
        title: "클립보드에 복사되었습니다!",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const textClearHandler = () => {
    setText("");
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mx-auto mt-14 lg:scale-90 xl:scale-100">
      {openModal && <ConfigModal onOpenModal={onModalAlert} />}
      <button
        onClick={onModalAlert}
        className="cursor-pointer mb-[-20px] w-[10rem] h-12 font-main text-xl font-bold items-end justify-end ml-[61rem] text-white bg-main-2 rounded-lg"
      >
        연동 설정
      </button>
      <div className="flex flex-row items-center justify-center">
        {translate ? (
          <Input />
        ) : (
          <div className="flex flex-col items-center justify-center px-12 py-24 mt-8 bg-gray-200 border-none rounded-xl">
            <p className="text-[400px] text-gray-300">
              <BsPersonFill />
            </p>
          </div>
        )}
        <p className="ml-[40px] text-6xl text-gray-200">
          <FaArrowRightLong />
        </p>
        {translate ? (
          <div className="flex flex-col ml-[30px] mt-[30px] w-[31.25rem] h-[37.5rem] md:w-2/3 bg-white rounded-xl border border-gray-200 shadow-md">
            <p className="w-[31.25rem] h-[31.25rem] break-all text-4xl text-black font-main p-9">
              {text}
            </p>
            <div
              className={`flex flex-row items-center justify-center h-[50px] mt-[35px]
              }`}
            >
              <button
                onClick={() => {
                  copyToClipboardHandler(text);
                }}
                className="text-4xl text-gray-300 mr-[15px] hover:bg-gray-200 hover:bg-opacity-30 rounded-full cursor-pointer"
              >
                <BiCopy />
              </button>
              <button
                onClick={textClearHandler}
                className="text-4xl text-gray-300 mr-[75px] hover:bg-gray-200 hover:bg-opacity-30 rounded-full cursor-pointer"
              >
                <BiRevision />
              </button>
              <button
                onClick={SendMessage}
                className="flex flex-row justify-center items-center rounded-xl min-w-[300px] w-[300px] h-[50px] bg-[#5865f2] text-white font-main text-xl"
              >
                <img
                  src={discord}
                  alt="discord"
                  className="w-[50px] mr-[5px]"
                />
                디스코드로 전송
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="p-9 ml-[40px] mt-[30px] w-[31.25rem] h-[37.5rem] bg-white rounded-xl border border-gray-200 shadow-md">
              <p className="text-3xl font-bold leading-normal text-black font-main">
                번역을 시작하려면 <br />
                아래 버튼을 눌러주세요. <br />
              </p>
              <button
                onClick={onClick}
                className="w-[140px] h-[55px] mt-[30px] rounded-xl font-bold font-main text-xl text-white bg-main-2"
              >
                시작하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translate;
