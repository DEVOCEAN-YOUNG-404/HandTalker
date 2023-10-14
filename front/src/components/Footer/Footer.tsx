import logo from "../../assets/icons/handtalker.webp";
import { AiFillGithub } from "react-icons/ai";
import devocean from "../../assets/icons/footer_devocean.webp";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div
      className={`bg-[#23A352] w-full ${
        path === "/" ? "fixed bottom-[0px]" : "relative"
      } h-32 flex flex-row items-center justify-center`}
    >
      <img src={logo} alt="logo" className="w-auto h-20 md:h-32" />
      <div className="flex flex-col items-start justify-start ml-[30px]">
        <p className="font-main text-[rgb(61,125,71)] text-xs md:text-sm">
          ©2023 HandTalker
        </p>
        <p className="font-main text-[rgb(61,125,71)] text-xs md:text-sm">
          DEVOCEAN YOUNG 2nd 404 Team
        </p>
        <p className="font-main text-[rgb(61,125,71)] text-xs md:text-sm">
          곽수진, 송보경, 정승준, 지현빈
        </p>
        <div className="flex flex-row items-center justify-center mt-[5px] md:mt-[10px]">
          <a
            href="https://github.com/DEVOCEAN-YOUNG-404/HandTalker"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-[rgb(61,125,71)] text-[23px] md:text-[30px] mr-[5px]">
              <AiFillGithub />
            </p>
          </a>
          <a href="https://devocean.sk.com/" target="_blank" rel="noreferrer">
            <img
              src={devocean}
              alt="devocean"
              className="w-[20px] md:w-[27px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
