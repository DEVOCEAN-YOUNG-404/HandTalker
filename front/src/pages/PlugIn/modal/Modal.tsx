import { useEffect } from "react";
import { ModalPortal } from "../../../utils/ModalPortal";

type ModalProps = {
  onOpenModal: () => void;
};

const Modal = ({ onOpenModal }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-main-black bg-opacity-70">
        <div className="container w-[800px] h-[700px] flex flex-col items-center justify-center bg-white border-none">
          <div className="items-start">
            {/* <p className="font-main text-[18px] mb-[10px] text-white">{text}</p> */}
            <button
              onClick={onOpenModal}
              className="border-none hover:text-green text-white font-main text-[18px] block mb-[10px]"
            >
              ▶︎ 네
            </button>
            <button
              onClick={onOpenModal}
              className="border-none hover:text-green text-white font-main text-[18px] block"
            >
              ▶︎ 아니오
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
