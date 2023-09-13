import logo from "../../assets/icons/logo.png";
import HeaderButton from "./HeaderButton";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../utils/recoil/atom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
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

  return (
    <div className="bg-white bg-opacity-70 top-0 fixed z-10 w-full h-[4.5rem] border-b border-gray border-opacity-70 flex flex-row justify-between items-center">
      <div className="ml-[10rem]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[11.7rem] h-6" />
        </Link>
      </div>

      <div className="flex flex-row items-center justify-center h-full mr-[10vw]">
        <HeaderButton
          isClicked={path === "/" ? true : false}
          name="메인"
          link="/"
        />
        <HeaderButton
          isClicked={path === "/translate" ? true : false}
          name="번역"
          link="/translate"
        />
        <HeaderButton
          isClicked={path === "/plugin" ? true : false}
          name="플러그인"
          link="/plugin"
        />
        {auth ? (
          <div
            className={`w-20
       h-full font-main text-base text-black flex flex-col justify-center items-center cursor-pointer`}
            onClick={logoutHandler}
          >
            로그아웃
          </div>
        ) : (
          <HeaderButton
            isClicked={path === "/login" ? true : false}
            name="로그인"
            link="/login"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
