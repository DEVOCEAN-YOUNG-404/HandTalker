import discord_blue from "../../../assets/images/plugin/discord_blue.webp";
import naver from "../../../assets/images/plugin/naver.webp";
import google from "../../../assets/images/plugin/google.webp";
import kakaotalk from "../../../assets/images/plugin/kakaotalk.webp";
import instagram from "../../../assets/images/plugin/instagram.webp";
import facebook from "../../../assets/images/plugin/facebook.webp";
import twitter from "../../../assets/images/plugin/twitter.webp";
import devocean from "../../../assets/images/plugin/devocean.webp";

interface PlatformListProps {
  onSelect: (page: string) => void;
}

export const PlatformList = ({ onSelect }: PlatformListProps) => {
  return (
    <div className="w-[150px] h-full flex flex-col items-center justify-center rounded-tl-[16px] rounded-bl-[16px] border-r shadow-lg border-gray-200">
      <button
        onClick={() => onSelect("discord")}
        className="w-[150px] h-[45px] pl-2 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100"
      >
        <img src={discord_blue} alt="img" className="w-auto h-[30px]" />
        <p className="ml-3 text-black text-md font-main">Discord</p>
      </button>
      <button className="w-[150px] h-[45px] pl-3 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={naver} alt="img" className="w-auto h-[32px]" />
        <p className="ml-4 text-black text-md font-main">Naver</p>
      </button>
      <button className="w-[150px] h-[45px] pl-3 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={google} alt="img" className="w-auto h-[32px]" />
        <p className="ml-4 text-black text-md font-main">Google</p>
      </button>
      <button className="w-[150px] h-[45px] pl-3 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={kakaotalk} alt="img" className="w-auto h-[32px] scale-150" />
        <p className="ml-4 text-black text-md font-main">KakaoTalk</p>
      </button>
      <button className="w-[150px] h-[45px] pl-2 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={instagram} alt="img" className="w-auto h-[35px]" />
        <p className="ml-3 text-black text-md font-main">Instagram</p>
      </button>
      <button className="w-[150px] h-[45px] pl-3 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={facebook} alt="img" className="w-auto h-[31px]" />
        <p className="ml-4 text-black text-md font-main">Facebook</p>
      </button>
      <button className="w-[150px] h-[45px] pl-2 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={twitter} alt="img" className="w-auto h-[36px]" />
        <p className="ml-[0.9rem] text-black text-md font-main">Twitter</p>
      </button>
      <button className="w-[150px] h-[45px] pl-3 mb-1 flex flex-row items-center justify-start transition-colors duration-150 hover:bg-green-100">
        <img src={devocean} alt="img" className="w-auto h-[30px]" />
        <p className="ml-[1.2rem] text-sm text-black font-main">DEVOCEAN</p>
      </button>
    </div>
  );
};
