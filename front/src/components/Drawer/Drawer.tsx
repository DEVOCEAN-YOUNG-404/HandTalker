import { useEffect, useRef, useState } from "react";
import { ModalPortal } from "../../utils/helpers/ModalPortal";
import "./DrawerAnimation.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../utils/recoil/atom";
import Swal from "sweetalert2";

interface Props {
  onOpen: () => void;
  isOpen: boolean;
}

export const Drawer = ({ onOpen, isOpen }: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authState);
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

  const logoutHandler = () => {
    localStorage.removeItem("UID");
    setAuth(false);
    Toast.fire({
      icon: "success",
      title: "로그아웃 성공!",
    });
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const outsideClickHandler = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setVisible(false);
      setTimeout(() => {
        onOpen();
      }, 290);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, []);

  return (
    <ModalPortal>
      <div className="fixed top-0 right-0 z-20 flex items-center justify-end w-full h-screen bg-black md:hidden bg-opacity-60">
        <div
          ref={modalRef}
          className={`w-[200px] h-full flex flex-col pl-5 pr-5 items-start justify-center bg-white border-main-2 ${
            visible ? "slide-in-from-right" : "slide-out-to-left"
          } space-y-4`}
        >
          <button
            className={`${
              path === "/" && "bg-main-1 font-bold"
            } w-full h-[2.3rem]  text-start pl-2 rounded-lg outline-none`}
            onClick={() => {
              navigate("/");
              onOpen();
            }}
          >
            <p className="text-2xl text-black font-main">메인</p>
          </button>
          <button
            className={`${
              path === "/translate" && "bg-main-1 font-bold"
            } w-full h-[2.3rem]  text-start pl-2 rounded-lg outline-none`}
            onClick={() => {
              navigate("/translate");
              onOpen();
            }}
          >
            <p className="text-2xl text-black font-main">번역</p>
          </button>
          <button
            className={`${
              path === "/plugin" && "bg-main-1 font-bold"
            } w-full h-[2.3rem] text-start pl-2 rounded-lg`}
            onClick={() => {
              navigate("/plugin");
              onOpen();
            }}
          >
            <p className="text-2xl text-black font-main">플러그인</p>
          </button>
          {auth ? (
            <button
              className={` w-full h-[2.3rem] text-start pl-2 rounded-lg outline-none`}
              onClick={() => {
                logoutHandler();
                onOpen();
              }}
            >
              <p className="text-2xl text-black font-main">로그아웃</p>
            </button>
          ) : (
            <button
              className={`${
                path === "/login" && "bg-main-1 font-bold"
              } w-full h-[2.3rem] text-start pl-2 rounded-lg outline-none`}
              onClick={() => {
                navigate("/login");
                onOpen();
              }}
            >
              <p className="text-2xl text-black font-main">로그인</p>
            </button>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};
