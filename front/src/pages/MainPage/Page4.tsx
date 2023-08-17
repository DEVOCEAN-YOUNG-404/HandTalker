import logo from "../../assets/icons/logo.png";
import discord from "../../assets/icons/discord.png";
import slack from "../../assets/icons/slack.png";
import kakaotalk from "../../assets/icons/kakaotalk.png";

const Page4 = () => {
  return (
    <div
      id="section4"
      className="h-[100vh] flex flex-col items-center justify-center"
    >
      <p className="text-4xl font-bold text-black font-main mb-[20px] text-center">
        다른 서비스에서도 쉽고 빠르게
      </p>
      <div className="flex flex-row items-center justify-center text-center">
        <img src={logo} alt="logo" className="w-[260px]" />
        <p className="text-4xl font-bold text-black font-main ml-[10px]">
          를 이용해보세요
        </p>
      </div>
      <div className="flex flex-row items-center justify-center mt-[60px]">
        <img src={discord} alt="discord" className="w-[150px] mr-[50px]" />
        <img src={slack} alt="slack" className="w-[150px] mr-[50px]" />
        <div className="w-[150px] h-[150px] rounded-full">
          <img src={kakaotalk} alt="kakaotalk" />
        </div>
      </div>
    </div>
  );
};

export default Page4;
