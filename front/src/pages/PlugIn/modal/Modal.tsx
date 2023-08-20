import { useEffect, useState } from "react";
import { ModalPortal } from "../../../utils/ModalPortal";
import { GrClose, GrNext, GrPrevious } from "react-icons/gr";
import MPage1 from "./MPage1";
import MPage2 from "./MPage2";
import MPage3 from "./MPage3";

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

  const [currentPage, setCurrentPage] = useState<number>(1);

  const nextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-70">
        <div className="container w-[850px] h-[600px] flex flex-col items-center justify-center bg-white border-none rounded-3xl">
          <div className="flex flex-row items-center mt-[20px]">
            <p className="text-4xl font-bold text-black font-main">
              디스코드 연결 가이드
            </p>
            <button onClick={onOpenModal}>
              <p className="text-4xl text-gray-500 opacity-60 ml-[470px]">
                <GrClose />
              </p>
            </button>
          </div>
          <div className="flex flex-row items-center mt-[20px]">
            <button onClick={prevPage}>
              <p className="text-4xl text-gray-500 opacity-60">
                <GrPrevious />
              </p>
            </button>
            {currentPage === 1 && <MPage1 />}
            {currentPage === 2 && <MPage2 />}
            {currentPage === 3 && <MPage3 />}
            <button onClick={nextPage}>
              <p className="text-4xl text-gray-500 opacity-60">
                <GrNext />
              </p>
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
