import logo from "../../assets/logo.png";
import HeaderButton from "./HeaderButton";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="bg-white bg-opacity-70 top-0 fixed z-10 min-w-[1366px] w-full h-[72px] border-b border-gray border-opacity-70 flex flex-row justify-start items-center">
      <img
        src={logo}
        alt="logo"
        className="fixed w-[174px] ml-[120px] flex-1"
      />

      <div className="flex flex-row items-center justify-center ml-[58vw] flex-1 h-full">
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
        <HeaderButton
          isClicked={path === "/login" ? true : false}
          name="로그인"
          link="/login"
        />
      </div>
    </div>
  );
};

export default Header;
