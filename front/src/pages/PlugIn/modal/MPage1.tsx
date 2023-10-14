import discord from "../../../assets/images/discord_screenshot.webp";

const MPage1 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[18rem] h-[25rem] md:w-[730px] md:h-[520px]">
      <img
        src={discord}
        alt="디스코드 화면"
        className="w-auto h-[12rem] md:h-[430px]"
      />
      <p className="text-lg md:text-xl font-main">
        1. 디스코드 데스크톱 애플리케이션을 실행해주세요.
      </p>
    </div>
  );
};

export default MPage1;
