import discord from "../../../assets/icons/discord.webp";
import page2_1 from "../../../assets/images/plugin/page2-1.webp";
import page2_2 from "../../../assets/images/plugin/page2-2.webp";

const MPage2 = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[18rem] h-[25rem] md:w-[730px] md:h-[520px]">
      <div className="flex flex-row items-center justify-start pb-5 space-x-3 overflow-scroll md:justify-center">
        <img
          src={page2_1}
          alt="디스코드 화면"
          className="w-auto h-[10rem] md:h-[260px]"
        />
        <img
          src={page2_2}
          alt="디스코드 화면"
          className="w-auto h-[10rem] md:h-[260px]"
        />
      </div>

      <a
        href="https://discord.com/api/oauth2/authorize?client_id=1139091593282981888&permissions=8&scope=bot%20applications.commands"
        target="_blank"
        rel="noreferrer"
      >
        <button className="flex flex-row justify-center items-center rounded-xl scale-90 w-[250px] h-[48px] md:w-[300px] md:h-[50px] bg-[#5865f2] text-white font-main text-xl">
          <img
            src={discord}
            alt="discord"
            className="w-[40px] md:w-[50px] mr-[5px]"
          />
          디스코드 봇 추가
        </button>
      </a>
      <p className="pt-5 text-lg leading-normal text-center md:leading-loose md:text-xl font-main">
        2. 위 버튼을 클릭하여 서버에 봇을 추가해주세요. <br />봇 추가를 위해서는
        서버 관리자 권한이 필요합니다. <br />
        봇을 추가하기 위해 사진과 같이 권한 설정을 해주세요.
      </p>
    </div>
  );
};

export default MPage2;
