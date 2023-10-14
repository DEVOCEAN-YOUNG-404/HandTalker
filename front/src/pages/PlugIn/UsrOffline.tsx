import plugin1 from "../../assets/images/plugin1.webp";
import { Link } from "react-router-dom";

const UsrOffline = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col px-9 md:px-10">
      <div className="w-full h-full flex mt-[50px] md:mt-[100px] flex-col pb-[20px]">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <img
            src={plugin1}
            alt="디스코드 연동 예시 이미지"
            className="md:w-[30rem] lg:w-[35rem] xl:w-[40rem]"
          />
          <div className="flex flex-col items-start justify-center md:ml-[50px] h-full">
            <p className="text-3xl font-bold leading-normal md:text-4xl font-main">
              지금 번역한 메시지, <br />
              모두에게 공유하고 싶다면?
            </p>
            <p className="text-xl leading-normal text-gray-400 font-main mt-[20px]">
              HandTalker로 번역한 메시지를 <br /> 여러 서비스로 전송해보세요.
            </p>
            <Link to="/login">
              <button className="flex flex-row justify-center items-center bg-main-2 w-[250px] h-[48px] md:w-[300px] md:h-[50px] text-xl text-white font-main mt-[20px] rounded-lg">
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
