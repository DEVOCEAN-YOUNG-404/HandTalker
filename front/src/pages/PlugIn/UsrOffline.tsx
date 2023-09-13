import plugin1 from "../../assets/images/plugin1.png";
import { Link } from "react-router-dom";

const UsrOffline = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <div className="w-full h-full flex mt-[100px] flex-col pb-[20px]">
        <p className="md:ml-[6rem] lg:ml-[8rem] xl:ml-[10rem] text-5xl font-bold text-black font-main">
          플러그인
        </p>
        <div className="flex flex-row items-center justify-center">
          <img
            src={plugin1}
            alt="디스코드 연동 예시 이미지"
            className="md:w-[30rem] lg:w-[35rem] xl:w-[40rem]"
          />
          <div className="flex flex-col items-start justify-center ml-[50px] h-full">
            <p className="text-4xl font-bold leading-normal font-main">
              지금 번역한 메시지, <br />
              모두에게 공유하고 싶다면?
            </p>
            <p className="text-xl leading-normal text-gray-400 font-main mt-[20px]">
              HandTalker로 번역한 메시지를 <br /> 여러 서비스로 전송해보세요.
            </p>
            <Link to="/login">
              <button className="flex flex-row justify-center items-center bg-main-2 w-[300px] h-[50px] text-xl text-white font-main mt-[20px] rounded-lg">
                로그인하고 사용해보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsrOffline;
