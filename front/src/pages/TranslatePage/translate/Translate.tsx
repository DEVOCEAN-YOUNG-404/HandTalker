import { FaArrowRightLong } from "react-icons/fa6";
import Input from "./Input";
import {
  translateState,
  resultText,
  dchannel,
} from "../../../utils/recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import discord from "../../../assets/icons/discord.png";
import { BiCopy, BiRevision } from "react-icons/bi";
import Swal from "sweetalert2";
import ConfigModal from "../config/ConfigModal";
import { NotTranslating } from "./NotTranslating";
import Webcam from "react-webcam";

const Translate = () => {
  const [openModal, setOpenModal] = useState(false);
  const onModalAlert = () => {
    setOpenModal(!openModal);
  };

  const [translate, setTranslate] = useRecoilState(translateState);
  const onClick = () => {
    setTranslate(true);
  };

  const webcamRef = useRef<Webcam>(null);
  useEffect(() => {
    if (webcamRef.current?.video) {
      const stream = webcamRef.current?.video.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      webcamRef.current.video.srcObject = null;
    }
  }, [translate]);

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
    <div className="mt-[5rem] md:mt-[7rem] flex flex-col items-center justify-start w-full h-full mx-auto mb-[4rem]">
      {openModal && <ConfigModal onOpenModal={onModalAlert} />}
      <button
        onClick={onModalAlert}
        className="w-[8rem] h-[2.5rem] md:w-[160px] md:h-[3rem] font-main text-xl font-bold items-end justify-end ml-[12rem] md:ml-[48.7rem] xl:ml-[61rem] text-white bg-main-2 rounded-lg"
      >
        연동 설정
      </button>
      <div className="flex flex-col items-center justify-center mt-2 md:flex-row">
        {translate ? <Input /> : <NotTranslating />}
        <p className="hidden md:block ml-[40px] text-6xl text-gray-200">
          <FaArrowRightLong />
        </p>
        {translate ? (
          <div className="mt-3 md:mt-0 flex flex-col md:ml-[40px] w-[20rem] h-[13rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] bg-white rounded-xl border border-gray-200 shadow-md">
            <p className="w-[20rem] h-[9.5rem] md:w-[31.25rem] md:h-[30rem] xl:h-[31.25rem] break-all overflow-scroll text-2xl md:text-4xl text-black font-main p-5 md:p-9">
              {text}
            </p>
            <div
              className={`flex flex-row items-center justify-end md:justify-center mr-2 md:mr-0 h-[50px] md:mb-[10px] xl:mt-[35px]
              }`}
            >
              <button
                onClick={() => {
                  copyToClipboardHandler(text);
                }}
                className="text-2xl md:text-4xl text-gray-300 mr-[15px] hover:bg-gray-200 hover:bg-opacity-30 rounded-full cursor-pointer"
              >
                <BiCopy />
              </button>
              <button
                onClick={textClearHandler}
                className="text-2xl md:text-4xl text-gray-300 md:mr-[30px] xl:mr-[75px] hover:bg-gray-200 hover:bg-opacity-30 rounded-full cursor-pointer"
              >
                <BiRevision />
              </button>
              <button
                onClick={SendMessage}
                className="ml-4 md:ml-0 flex flex-row justify-center items-center rounded-xl md:min-w-[16rem] w-[11rem] h-[2.7rem] md:w-[16rem] xl:w-[18.75rem] md:h-[3rem] xl:h-[3.2rem] bg-[#5865f2] text-white font-main text-xl"
              >
                <img
                  src={discord}
                  alt="discord"
                  className="w-[30px] md:w-[40px] xl:w-[50px] mr-[5px]"
                />
                디스코드로 전송
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-3 md:mt-0 p-5 md:p-9 md:ml-[40px] w-[20rem] h-[13rem] md:w-[25rem] xl:w-[31.25rem] md:h-[31.25rem] xl:h-[37.5rem] bg-white rounded-xl border border-gray-200 shadow-md">
            <p className="text-2xl font-bold leading-normal text-black md:text-3xl font-main">
              번역을 시작하려면 <br />
            </p>
            <p className="mt-0 text-2xl font-bold leading-normal text-black md:text-3xl font-main md:mt-2">
              아래 버튼을 눌러주세요. <br />
            </p>
            <button
              onClick={onClick}
              className="w-[7rem] h-[2.7rem] md:w-[8.75rem] md:h-[3rem] mt-[30px] rounded-xl font-bold font-main text-xl text-white bg-main-2"
            >
              시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translate;
