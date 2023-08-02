import main2 from "../../assets/main2.png";
import logo from "../../assets/logo.png";

const Page2 = () => {
  return (
    <div
      id="section2"
      className="ml-[240px] min-w-[1366px] mr-[240px] h-[100vh] mt-[-50px] flex flex-row items-center justify-start"
    >
      <img src={main2} alt="main2" className="block w-[550px]" />
      <div className="flex flex-col items-start justify-start ml-[80px]">
        <div className="flex flex-row items-center justify-center">
          <img src={logo} alt="logo" className="block w-[250px] " />
          <p className="text-4xl font-bold text-black font-main ml-[15px]">
            소개
          </p>
        </div>
        <p className="text-base text-gray-400 font-main mt-[20px]">
          HandTalker는 수어를 통해 의사소통을 할 수 있도록 도와주는 수어 번역 웹
          서비스입니다.
          <br />
          <br />
          HandTalker는 가족 구성원 내 농인 자녀를 위한 소통 서비스를 제공합니다.{" "}
          <br />
          <br />
          또한 후천적 농인을 위한 실습 교육 자료로 서비스를 제공하며 모국어가
          수어인 농인들의 학습을 보조하는 등 교육 목적으로도 다양하게 활용이
          가능한 서비스입니다.
        </p>
      </div>
    </div>
  );
};

export default Page2;
