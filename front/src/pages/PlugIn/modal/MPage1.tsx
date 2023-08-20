import discord from "../../../assets/images/discord_screenshot.png";

const MPage1 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[730px] h-[520px]">
      <img src={discord} alt="디스코드 화면" className="w-[500px]" />
      <p className="text-xl font-main">
        1. 디스코드 데스크톱 애플리케이션을 실행해주세요.
      </p>
    </div>
  );
};

export default MPage1;
