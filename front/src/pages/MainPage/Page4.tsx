import logo from "../../assets/icons/logo.svg";
import discord from "../../assets/icons/discord.webp";
import slack from "../../assets/icons/slack.webp";
import kakaotalk from "../../assets/icons/kakaotalk.webp";
import LazyLoad from "react-lazy-load";

const Page4 = () => {
  return (
    <div
      id="section4"
      className="h-[100vh] flex flex-col items-center justify-center"
    >
      <p className="text-2xl md:text-4xl font-bold text-black font-main mb-[20px] text-center">
        다른 서비스에서도 쉽고 빠르게
      </p>
      <div className="flex flex-row items-center justify-center text-center">
        <img src={logo} alt="logo" className="w-auto h-[1rem] md:h-[2rem]" />
        <p className="text-2xl md:text-4xl font-bold text-black font-main ml-[10px]">
          를 이용해보세요
        </p>
      </div>
      <div className="flex flex-row items-center justify-center mt-[60px] space-x-6 md:space-x-[4rem]">
        <img
          src={discord}
          alt="discord"
          className="w-auto h-[5rem] md:h-[10rem]"
        />

        <img src={slack} alt="slack" className="w-auto h-[5rem] md:h-[10rem]" />

        <div className="rounded-full">
          <img
            src={kakaotalk}
            alt="kakaotalk"
            className="w-auto h-[5rem] md:h-[10rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default Page4;
